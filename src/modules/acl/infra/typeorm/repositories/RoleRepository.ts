import { IRoleRepository } from "@modules/acl/repositories/IRoleRepository";
import { getRepository } from "typeorm";
import Role from "../entities/Role";
import ICreateRoleDTO from "@modules/acl/dto/ICreateRoleDTO";
import BaseRepository from "@shared/infra/typeorm/repositories/BaseRepository";

export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {
  constructor() {
    super()
    this.ormRepository = getRepository(Role);
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return await this.ormRepository.findOne({name});
  }

  public async findByIds(ids: string[]): Promise<Role[]> {
    return await this.ormRepository.findByIds(ids);
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