import { Request, Response } from 'express';
import { container } from "tsyringe";
import ListTaskByStatusService from '@modules/tasks/services/ListTaskByStatusService';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';


export default class TaskController {


  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, status } = request.body;

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      title,
      description,
      status
    });

    return response.json({ task });
  }

  public async listByStatus(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;

    const listTaskByStatus = container.resolve(ListTaskByStatusService);

    const tasks = await listTaskByStatus.execute({
      status: status ? String(status):''
    });

    return response.json({ tasks });
  }
}
