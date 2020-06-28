import { MongoRepository, getMongoRepository } from "typeorm";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "../schemas/User";
import ICreateUserDTO from "@modules/users/dto/ICreateUserDTO";
import BaseRepository from "@shared/infra/typeorm/repositories/BaseRepository";


export default class UserRepository extends BaseRepository<User> implements IUserRepository {

  constructor() {
    super()
    this.ormRepository = getMongoRepository(User, 'mongo');
  }

  public async findByEmail(email: string): Promise<any> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.validate(user);
    this.ormRepository.save(user)
    return user;
  }

}