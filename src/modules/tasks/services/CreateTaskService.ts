import { injectable, inject } from "tsyringe";
import { ITaskRepository } from "../repositories/ITaskRepository";

interface ITaskRequest {
  title: string;
  description: string;
  status?: string;
}

@injectable()
export default class CreateTaskService {

  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) { }

  async execute({ title, description, status }: ITaskRequest): Promise<any> {
    status = status || 'to_do'
    const task = await this.taskRepository.create({ title, description, status });
    return task;
  }
}