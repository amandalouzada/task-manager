import { injectable, inject } from 'tsyringe';
import  ITaskRepository  from '../repositories/ITaskRepository';
import { TaskStatus } from '../infra/typeorm/entities/Task';

interface ITaskRequest {
  title: string;
  description: string;
  status?: TaskStatus;
}

@injectable()
export default class CreateTaskService {

  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) { }

  async execute({ title, description, status }: ITaskRequest): Promise<any> {
    status = status || TaskStatus.TO_DO
    const task = await this.taskRepository.create({ title, description, status });
    return task;
  }
}