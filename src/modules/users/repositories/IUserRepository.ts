import { ICreateUserDTO } from "../dto/ICreateUserDTO";

//TODO change types any
export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<any>;
  findByEmail(email:string):Promise<any>;
}