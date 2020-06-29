import 'reflect-metadata';

import { uuid, isUuid } from 'uuidv4';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import { IRoleRepository } from '@modules/acl/repositories/IRoleRepository';
import CreateUserBackOfficeService from './CreateUserBackOfficeService';

let createUserBackOffice: CreateUserBackOfficeService;
let mockUserRepository: IUserRepository;
let mockRoleRepository: IRoleRepository;
let hashedProvider: IHashProvider;

describe('CreateUserBackOfficeService', () => {

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
        })
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
        .mockImplementation((name: string) => {
          return {
            id: uuid(),
            name:name ,
            description: `Role ${name} description`,
          }
        }),
    }
    hashedProvider = {
      generateHash: jest.fn().mockImplementation(async (password: string) => {
        return password.replace(/1/g, 'A')
      }),
      compareHash: jest.fn().mockImplementation(async (payload: string, hashed: string) => {
        return payload.replace(/1/g, 'A') === hashed;
      })
    }
    createUserBackOffice = new CreateUserBackOfficeService(mockUserRepository, hashedProvider, mockRoleRepository);
  });

  it('should not be able to create a new user with same email from another', async () => {
    await expect(createUserBackOffice.execute({
      name: 'Amanda Louzada',
      email: 'amandanuneslouzada@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserBackOffice.execute({
      name: 'Amanda Louzada',
      email: 'amanda.nuneslouzada@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(isUuid(user.id)).toBeTruthy();
    expect(user).toHaveProperty('email', 'amanda.nuneslouzada@gmail.com');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('roles');
  });
});
