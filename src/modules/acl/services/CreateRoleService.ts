import { IRoleRepository } from "../repositories/IRoleRepository";

interface IRoleRequest {
  name: string;
  description?: string;
}

export class CreateRoleService {
  constructor(private roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  public async execute({ name, description }: IRoleRequest): Promise<any> {
    const role = await this.roleRepository.create({
      name,
      description
    });
    return role;
  }
}