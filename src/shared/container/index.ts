
import { container } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import '@modules/users/providers';
import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';
import { IRoleRepository } from '@modules/acl/repositories/IRoleRepository';
import { RoleRepository } from '@modules/acl/infra/typeorm/repositories/RoleRepository';


container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);

container.registerSingleton<IRoleRepository>(
  'RoleRepository',
  RoleRepository
);

container.registerSingleton<ITaskRepository>(
  'TaskRepository',
  TaskRepository
);