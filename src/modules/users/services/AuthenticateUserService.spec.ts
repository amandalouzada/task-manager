
import 'reflect-metadata';

import { uuid, isUuid } from 'uuidv4';
import IUserRepository from '../repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let authenticateUser: AuthenticateUserService;
let mockUserRepository: IUserRepository;
let hashedProvider: IHashProvider;

describe('AuthenticateUserService', () => {

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn()
        .mockImplementation(async (email: string) => {
          if (email === 'amandanuneslouzada@gmail.com') return { id: uuid(), email, password: 'A23456' };
          return null;
        })
    }
    hashedProvider = {
      generateHash: jest.fn().mockImplementation(async (password: string) => {
        return password.replace(/1/g, 'A');
      }),
      compareHash: jest.fn().mockImplementation(async (payload: string, hashed: string) => {
        return payload.replace(/1/g, 'A') === hashed;
      })
    }
    authenticateUser = new AuthenticateUserService(mockUserRepository, hashedProvider);
  });

  it('should not be able to auth with invalid password', async () => {
    await expect(authenticateUser.execute({
      email: 'amandanuneslouzada@gmail.com',
      password: '923456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to auth', async () => {
    const auth = await authenticateUser.execute({
      email: 'amandanuneslouzada@gmail.com',
      password: '123456'
    })
    await expect(auth).toHaveProperty('user');
    await expect(auth).toHaveProperty('token');
  });

});
