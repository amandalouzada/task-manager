import ICreateRoleDTO from "../dto/ICreateRoleDTO";

export interface IRoleRepository {
  create(data: ICreateRoleDTO): Promise<any>;
}