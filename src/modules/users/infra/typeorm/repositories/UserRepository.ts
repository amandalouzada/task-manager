import { getRepository } from "typeorm";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "../entities/User";
import ICreateUserDTO from "@modules/users/dto/ICreateUserDTO";
import BaseRepository from "@shared/infra/typeorm/repositories/BaseRepository";


export default class UserRepository extends BaseRepository<User> implements IUserRepository {

  constructor() {
    super()
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<any> {
    const user = await this.ormRepository.findOne({
      relations: ["roles"],
      where: { email },
    });
    return user;
  }

  public async create({ name, email, password, roles }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    if (roles) user.roles = roles
    await this.validate(user);
    this.ormRepository.save(user)
    return user;

  }

}