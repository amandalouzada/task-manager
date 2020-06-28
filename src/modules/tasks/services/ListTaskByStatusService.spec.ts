import 'reflect-metadata';
import { uuid } from 'uuidv4';
import ITaskRepository from '../repositories/ITaskRepository';
import ListTaskByStatusService from './ListTaskByStatusService';
import IFindAllByStatusDTO from '../dto/IFindAllByStatusDTO';

describe('ListTaskByStatusService', () => {
  let mockTaskRepository: ITaskRepository;
  let listTask: ListTaskByStatusService;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      findAllByStatus: jest.fn()
        .mockImplementation(async (data: IFindAllByStatusDTO) => {
          const taks = [
            {
              id: uuid(),
              title: 'Teste 1',
              description: 'Teste description 1',
              status: 'to_do'
            },
            {
              id: uuid(),
              title: 'Teste 2',
              description: 'Teste description 2',
              status: 'done'
            },
            {
              id: uuid(),
              title: 'Teste 3',
              description: 'Teste description 3',
              status: 'to_do'
            },
            {
              id: uuid(),
              title: 'Teste 3',
              description: 'Teste description 3',
              status: 'doing'
            }
          ]
          return taks.filter(task => data.status.includes(task.status));
        })
    }
    listTask = new ListTaskByStatusService(mockTaskRepository);
  });

  it('should be able to list taks by status', async () => {
    const tasks = await listTask.execute({ status: 'to_do,doing' });

    tasks.forEach((task: any) => {
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('status');
      expect(['doing', 'to_do'].includes(task.status)).toBeTruthy();
      expect(task.status).not.toEqual('done');
    });

  });
});
