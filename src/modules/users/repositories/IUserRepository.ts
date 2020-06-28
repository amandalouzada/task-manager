import ICreateUserDTO  from "../dto/ICreateUserDTO";

//TODO change types any
export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<any>;
  findByEmail(email:string):Promise<any>;
}