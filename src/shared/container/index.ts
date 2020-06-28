
import { container } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import '@modules/users/providers';
import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';


container.registerSingleton<IUserRepository>(
  'UserRepository',
   UserRepository
);

container.registerSingleton<ITaskRepository>(
  'TaskRepository',
   TaskRepository
);