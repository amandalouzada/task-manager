import 'reflect-metadata';

import { uuid, isUuid } from 'uuidv4';
import CreateUserService from './CreateUserService';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

let createUser: CreateUserService;
let mockUserRepository: IUserRepository;
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
        })
    }
    hashedProvider = {
      generateHash: jest.fn().mockImplementation(async (password: string) => {
        return password.replace(/\d*/g, 'A');
      }),
      compareHash: jest.fn().mockImplementation(async (payload: string, hashed: string) => {
        return payload.replace(/\d*/g, 'A') === hashed;
      })
    }
    createUser = new CreateUserService(mockUserRepository, hashedProvider);
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
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(isUuid(user.id)).toBeTruthy();
    expect(user).toHaveProperty('email', 'amanda.nuneslouzada@gmail.com');
    expect(user).toHaveProperty('password');
  });
});
