import { IRoleRepository } from "@modules/acl/repositories/IRoleRepository";
import { MongoRepository, getMongoRepository } from "typeorm";
import Role from "../schemas/Role";
import ICreateRoleDTO from "@modules/acl/dto/ICreateRoleDTO";
import BaseRepository from "@shared/infra/typeorm/repositories/BaseRepository";

export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {
  constructor() {
    super()
    this.ormRepository = getMongoRepository(Role);
  }

  public async create({ name, description }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({
      name,
      description
    });
    await this.validate(role)
    await this.ormRepository.save(role);

    return role;
  }
}