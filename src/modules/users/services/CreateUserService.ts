import IUserRepository from "../repositories/IUserRepository";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  roles?: string[];
}
@injectable()
class CreateUserService {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  public async execute({ name,
    email,
    password,
    roles }: IUserRequest): Promise<any> {
    roles = roles || [];
    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser) throw new AppError('Email address already used.');
    const user = await this.userRepository.create({
      name,
      email,
      password,
      roles
    });
    return user;
  }
}

export default CreateUserService;
