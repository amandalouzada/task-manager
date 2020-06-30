import IUserRepository from "../repositories/IUserRepository";
import { injectable, inject } from "tsyringe";

interface IListUserRequest {
  name?: string;
  email?: string;
}
@injectable()
class ListUsersService {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  public async execute({ name,
    email,
  }: IListUserRequest): Promise<any> {
    const users = await this.userRepository.findAll({ name, email });
    return users;
  }
}

export default ListUsersService;
