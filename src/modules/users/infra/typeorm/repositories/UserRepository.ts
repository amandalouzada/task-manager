import { getRepository, Like } from "typeorm";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "../entities/User";
import ICreateUserDTO from "@modules/users/dto/ICreateUserDTO";
import BaseRepository from "@shared/infra/typeorm/repositories/BaseRepository";
import IFindAllDTO from "@modules/users/dto/IFindAllDTO";
import { IsEmail } from "class-validator";
import { query } from "express";


export default class UserRepository extends BaseRepository<User> implements IUserRepository {

  constructor() {
    super()
    this.ormRepository = getRepository(User);
  }

  public async findAll({ name, email }: IFindAllDTO): Promise<User[]> {
    let queryGeneric: string | undefined;
    if (name) {
      name = `%${name}%`
      queryGeneric = `LOWER(users.name) Like Lower(:name)`;
    }
    if (email) {
      email = `%${email}%`
      queryGeneric = `${queryGeneric ? `${queryGeneric} and ` : ''} LOWER(users.email) Like LOWER(:email)`;
    }
    return this.ormRepository.createQueryBuilder("users").where(queryGeneric || '', { name, email }).getMany()
  }

  public async findByEmail(email: string): Promise<User | undefined> {
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