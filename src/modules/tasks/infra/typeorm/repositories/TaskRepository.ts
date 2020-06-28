import { getRepository, In, IsNull, Not } from 'typeorm';
import BaseRepository from '@shared/infra/typeorm/repositories/BaseRepository';
import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import Task from '../entities/Task';
import ICreateTaskDTO from '@modules/tasks/dto/ICreateTaskDTO';
import IFindAllByStatusDTO from '@modules/tasks/dto/IFindAllByStatusDTO';


export default class TaskRepository extends BaseRepository<Task> implements ITaskRepository {

  constructor() {
    super()
    this.ormRepository = getRepository(Task);
  }

  async create(data: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create(data);
    await this.validate(task);
    this.ormRepository.save(task)
    return task;
  }

  async findAllByStatus(data: IFindAllByStatusDTO): Promise<Task[]> {
      const tasks = await this.ormRepository.find({
        where: {
          status: data.status.length > 0 ? In(data.status) : Not(IsNull())
        }
      })
    return tasks;
  }

}