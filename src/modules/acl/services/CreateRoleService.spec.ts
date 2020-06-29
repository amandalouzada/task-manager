
import { CreateRoleService } from "./CreateRoleService";
import { IRoleRepository } from "../repositories/IRoleRepository";
import ICreateRoleDTO from "../dto/ICreateRoleDTO";
import { uuid, isUuid } from 'uuidv4';

describe('CreateRoleService', () => {
  let createRole: CreateRoleService;
  let mockRoleRepository: IRoleRepository;
  beforeEach(() => {
    mockRoleRepository = {
      create: jest.fn().mockImplementation((data: ICreateRoleDTO) => {
        return { id: uuid(), ...data };
      }),
      findByIds: jest.fn()
    }

    createRole = new CreateRoleService(
      mockRoleRepository
    );

  });

  it('should be able to create a new role', async () => {

    const role = await createRole.execute({
      name: 'Admin',
      description: 'Administrador do sistema'
    });

    expect(role).toHaveProperty('id');
    expect(role).toHaveProperty('name', 'Admin');
    expect(role).toHaveProperty('description', 'Administrador do sistema');
    expect(isUuid(role.id)).toBeTruthy();
  });
});
