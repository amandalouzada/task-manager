import ICreateRoleDTO from "../dto/ICreateRoleDTO";
import Role from "../infra/typeorm/entities/Role";

export interface IRoleRepository {
  create(data: ICreateRoleDTO): Promise<Role>;
  findByIds(id: string[]): Promise<Role[]>;
  findByName(name: string): Promise<Role | undefined>;
}