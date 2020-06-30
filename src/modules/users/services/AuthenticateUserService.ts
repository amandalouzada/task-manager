import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import Role from '@modules/acl/infra/typeorm/entities/Role';
import sendLog from '@shared/container/providers/LogstashProvider/LogstashProvider';

interface IAuthRequest {
  email: string;
  password: string;
}
@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    email,
    password }: IAuthRequest): Promise<any> {

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('Incorrect email or password.', 401);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({
      roles: user.roles.map((role: Role) => role.name)
    }, secret, {
      subject: user.id,
      expiresIn,
    });

    sendLog({
      index_log: 'login',
      sub: user.id
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
