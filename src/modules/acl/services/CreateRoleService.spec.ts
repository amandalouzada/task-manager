import { CreateRoleService } from "./CreateRoleService";
import { IRoleRepository } from "../repositories/IRoleRepository";
import ICreateRoleDTO from "../dto/ICreateRoleDTO";
import { ObjectID } from 'mongodb';

describe('CreateRoleService', () => {
  let createRole: CreateRoleService;
  let mockRoleRepository: IRoleRepository;
  beforeEach(() => {
    mockRoleRepository = {
      create: jest.fn().mockImplementation((data: ICreateRoleDTO) => {
        return { _id: new ObjectID(), ...data };
      })
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
    expect(role).toHaveProperty('_id');
    expect(role).toHaveProperty('name','Admin');
    expect(role).toHaveProperty('description','Administrador do sistema');
  });
});
