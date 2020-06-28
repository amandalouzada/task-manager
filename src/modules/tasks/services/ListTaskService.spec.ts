import 'reflect-metadata';
import { uuid, isUuid } from 'uuidv4';
import { ITaskRepository } from '../repositories/ITaskRepository';
import ICreateTaskDTO from '../dto/ICreateTaskDTO';
import ListTaskService from './ListTaskService';
import IFindAllByStatusDTO from '../dto/IFindAllByStatusDTO';

describe('ListTaskService', () => {
  let mockTaskRepository: ITaskRepository;
  let listTask: ListTaskService;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(),
      findAllByStatus: jest.fn()
        .mockImplementation(async (data: IFindAllByStatusDTO) => {
          const taks = [
            {
              title: 'Teste 1',
              description: 'Teste description 1',
              status: 'to_do'
            },
            {
              title: 'Teste 2',
              description: 'Teste description 2',
              status: 'done'
            },
            {
              title: 'Teste 3',
              description: 'Teste description 3',
              status: 'to_do'
            },
            {
              title: 'Teste 3',
              description: 'Teste description 3',
              status: 'doing'
            }
          ]
          return taks.filter(task => data.status.includes(task.status));
        })
    }
    listTask = new ListTaskService(mockTaskRepository);
  });

  it('should be able to create a new instance', async () => {
    const tasks = await listTask.execute({ status: 'to_do,doing' });

    tasks.forEach((task: any) => {
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('status');
      expect(['doing','to_do'].includes(task.status)).toBeTruthy();
      expect(task.status).not.toEqual('done');
    });

  });
});
