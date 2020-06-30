import { Request, Response } from 'express';
import { container } from "tsyringe";
import { classToClass } from 'class-transformer';

import CreateUserBackOfficeService from '@modules/users/services/CreateUserBackOfficeService';
import ListUsersService from '@modules/users/services/ListUsersService';

export default class UsersController {

  public async createBackoffice(request: Request, response: Response): Promise<Response> {
    const { name, email, password, rolesId } = request.body;

    const createUserBackoffice = container.resolve(CreateUserBackOfficeService);

    const user = await createUserBackoffice.execute({
      name,
      email,
      password
    });
    return response.json(classToClass(user));
  }

  public async listAll(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.query;

    const listUser = container.resolve(ListUsersService);

    const users = await listUser.execute({
      name: name ? String(name) : undefined,
      email: email ? String(email) : undefined
    });
    return response.json({ users });
  }
}
