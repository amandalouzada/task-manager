import { IRoleRepository } from "@modules/acl/repositories/IRoleRepository";
import { MongoRepository, getMongoRepository } from "typeorm";
import Role from "../schemas/Role";
import ICreateRoleDTO from "@modules/acl/dto/ICreateRoleDTO";

export class RoleRepository implements IRoleRepository {
  private ormRepository: MongoRepository<Role>;

  constructor() {
    this.ormRepository = getMongoRepository(Role);
  }

  public async create({ name, description }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({
      name,
      description
    });

    await this.ormRepository.save(role);

    return role;
  }
}