import 'reflect-metadata';

import IUserRepository from '../repositories/IUserRepository';
import ListUsersService from './ListUsersService';
import IFindAllDTO from '../dto/IFindAllDTO';
import { uuid } from 'uuidv4';


let mockUserRepository: IUserRepository;
let listUsers: ListUsersService;

describe('ListUsersService', () => {

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn()
        .mockImplementation(async ({ name, email }: IFindAllDTO) => {
          const users = [
            {
              id: uuid(),
              email: "amandanuneslouzada@gmail.com",
              name: "Amanda Louzada",
              createdAt: "2020-06-30T06:04:41.777Z",
              updatedAt: "2020-06-30T06:04:41.777Z",
              roles: []
            },
            {
              id: uuid(),
              email: "amandanunes@gmail.com",
              name: "Amanda Nunes",
              createdAt: "2020-06-30T06:04:41.777Z",
              updatedAt: "2020-06-30T06:04:41.777Z",
              roles: []
            },
            {
              id: uuid(),
              email: "jose@email.com",
              name: "José da Silva",
              createdAt: "2020-06-30T06:04:41.777Z",
              updatedAt: "2020-06-30T06:04:41.777Z",
              roles: []
            },
            {
              id: uuid(),
              email: "maria@email.com",
              name: "Maria da Silva",
              createdAt: "2020-06-30T06:04:41.777Z",
              updatedAt: "2020-06-30T06:04:41.777Z",
              roles: []
            }
          ]
          return users.filter(user => {
            if (name && email)
              return user.name.includes(name) || user.email.includes(email)
            if (name) return user.name.includes(name)
            if (email) return user.email.includes(email)
          })
        })
    }
    listUsers = new ListUsersService(mockUserRepository);
  });


  it('should be able to list all users', async () => {
    const users = await listUsers.execute({
      email: 'louzada@gmail.com'
    });
    expect(users).toHaveLength(1);
  });
});
