import { ObjectID } from 'mongodb';
import { CreateUserService } from './CreateUserService';
import { IUserRepository } from '../repositories/IUserRepository';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import AppError from '@shared/errors/AppError';

let createUser: CreateUserService;
let mockUserRepository: IUserRepository;

describe('CreateUserService', () => {

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn()
        .mockImplementation(async (data: ICreateUserDTO) => {
          return {
            id: new ObjectID(),
            ...data,
          }
        }),
      findByEmail: jest.fn()
        .mockImplementation(async (email: string) => {
          if (email === 'amandanuneslouzada@gmail.com') return { email };
          return null;
        })
    }
    createUser = new CreateUserService(mockUserRepository);
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
    expect(user).toHaveProperty('email', 'amanda.nuneslouzada@gmail.com');
    expect(user).toHaveProperty('password');
  });
});
