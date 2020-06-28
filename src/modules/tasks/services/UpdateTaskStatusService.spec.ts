import 'reflect-metadata';
import { uuid, isUuid } from 'uuidv4';
import ITaskRepository from '../repositories/ITaskRepository';
import ICreateTaskDTO from '../dto/ICreateTaskDTO';
import UpdateTaskStatusService from './UpdateTaskStatusService';
import { TaskStatus } from '../infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

describe('UpdateTaskStatusService', () => {
  let mockTaskRepository: ITaskRepository;
  let updateTaskStatus: UpdateTaskStatusService;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(),
      findById: jest.fn().mockImplementation((id: string) => {
        return [{
          id: 'eb1167da-becb-4a79-a037-3a8c5abe29c4',
          title: "Tarefa 1",
          description: "Descrição da tarefa 1",
          status: "to_do",
          createdAt: "2020-06-29T00:30:29.451Z",
          updatedAt: "2020-06-29T00:30:29.451Z"
        }].find(task => task.id === id);
      }),
      save: jest.fn().mockImplementation((data: ICreateTaskDTO) => {
        return { ...data };
      }),
      findAllByStatus: jest.fn()
    }
    updateTaskStatus = new UpdateTaskStatusService(mockTaskRepository);
  });

  it('should be able to update status task', async () => {

    const task = await updateTaskStatus.execute({
      id: 'eb1167da-becb-4a79-a037-3a8c5abe29c4',
      status: TaskStatus.DOING
    });
    expect(task).toHaveProperty('id');

  });


  it('should not be able to update task status not found', async () => {

    await expect(updateTaskStatus.execute({
      id: uuid(),
      status: TaskStatus.DOING
    })).rejects.toBeInstanceOf(AppError)

  });
});
