import ICreateUserDTO from "../dto/ICreateUserDTO";
import IFindAllDTO from "../dto/IFindAllDTO";
import User from "../infra/typeorm/entities/User";

//TODO change types any
export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(data: IFindAllDTO): Promise<User[]>;
}