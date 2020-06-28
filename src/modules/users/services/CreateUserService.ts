import { IUserRepository } from "../repositories/IUserRepository";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  roleId?: string;
}

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ name,
    email,
    password,
    roleId }: IUserRequest): Promise<any> {
    const user = await this.userRepository.create({
      name,
      email,
      password,
      roleId
    });
    return user;
  }
}