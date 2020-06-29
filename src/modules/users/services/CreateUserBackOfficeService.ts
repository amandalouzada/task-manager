import IUserRepository from "../repositories/IUserRepository";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";
import { IRoleRepository } from "@modules/acl/repositories/IRoleRepository";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  rolesId?: string[];
}
@injectable()
class CreateUserBackOfficeService {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) { }

  public async execute({ name,
    email,
    password,
    rolesId }: IUserRequest): Promise<any> {
    rolesId = rolesId || [];
    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser) throw new AppError('Email address already used.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const role = await this.roleRepository.findByName('backoffice');
    if (!role) throw new AppError('Role not found');
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      roles: [role]
    });
    return user;
  }
}

export default CreateUserBackOfficeService;
