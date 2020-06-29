import { Request, Response } from 'express';
import { container } from "tsyringe";
import { classToClass } from 'class-transformer';

import CreateUserBackOfficeService from '@modules/users/services/CreateUserBackOfficeService';

export default class UsersController {

  public async createBackoffice(request: Request, response: Response): Promise<Response> {
    const { name, email, password ,rolesId} = request.body;

    const createUserBackoffice = container.resolve(CreateUserBackOfficeService);

    const user = await createUserBackoffice.execute({
      name,
      email,
      password
    });
    return response.json(classToClass(user));
  }
}
