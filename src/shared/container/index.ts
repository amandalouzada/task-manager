
import { container } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import '@modules/users/providers';


container.registerSingleton<IUserRepository>(
  'UserRepository',
   UserRepository
);