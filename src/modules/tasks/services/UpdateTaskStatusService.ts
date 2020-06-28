import { injectable, inject } from 'tsyringe';
import ITaskRepository from '../repositories/ITaskRepository';
import { TaskStatus } from '../infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

interface IUpdateTaskRequest {
  id: string;
  status: TaskStatus;
}

@injectable()
export default class UpdateTaskStatusService {

  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) { }

  async execute({ id, status }: IUpdateTaskRequest): Promise<any> {

    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found.');
    }
    
    task.status = status
    return this.taskRepository.save(task);
  }
}