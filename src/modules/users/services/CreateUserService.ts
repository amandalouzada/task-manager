import IUserRepository from "../repositories/IUserRepository";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";

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
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ name,
    email,
    password,
    roles }: IUserRequest): Promise<any> {
    roles = roles || [];
    const foundUser = await this.userRepository.findByEmail(email);
    console.log(foundUser);

    if (foundUser) throw new AppError('Email address already used.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      roles
    });
    return user;
  }
}

export default CreateUserService;
