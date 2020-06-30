import 'reflect-metadata';

import { uuid, isUuid } from 'uuidv4';
import CreateUserService from './CreateUserService';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import { IRoleRepository } from '@modules/acl/repositories/IRoleRepository';

let createUser: CreateUserService;
let mockUserRepository: IUserRepository;
let mockRoleRepository: IRoleRepository;
let hashedProvider: IHashProvider;

describe('CreateUserService', () => {

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn()
        .mockImplementation(async (data: ICreateUserDTO) => {
          return {
            id: uuid(),
            ...data,
          }
        }),
      findByEmail: jest.fn()
        .mockImplementation(async (email: string) => {
          if (email === 'amandanuneslouzada@gmail.com') return { email };
          return null;
        }),
      findAll: jest.fn()

    }
    mockRoleRepository = {
      create: jest.fn(),
      findByIds: jest.fn()
        .mockImplementation((ids: string[]) => {
          return ids.map((id, index) => {
            return {
              id,
              name: `Role ${index}`,
              description: `Role description ${index}`,
            }
          })
        }),
      findByName: jest.fn()
    }
    hashedProvider = {
      generateHash: jest.fn().mockImplementation(async (password: string) => {
        return password.replace(/1/g, 'A')
      }),
      compareHash: jest.fn().mockImplementation(async (payload: string, hashed: string) => {
        return payload.replace(/1/g, 'A') === hashed;
      })
    }
    createUser = new CreateUserService(mockUserRepository, hashedProvider, mockRoleRepository);
  });

  it('should not be able to create a new user with same email from another', async () => {
    await expect(createUser.execute({
      name: 'Amanda Louzada',
      email: 'amandanuneslouzada@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Amanda Louzada',
      email: 'amanda.nuneslouzada@gmail.com',
      password: '123456',
      rolesId: [uuid(), uuid()]
    });

    expect(user).toHaveProperty('id');
    expect(isUuid(user.id)).toBeTruthy();
    expect(user).toHaveProperty('email', 'amanda.nuneslouzada@gmail.com');
    expect(user).toHaveProperty('password');
  });
});
