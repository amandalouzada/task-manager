import 'reflect-metadata';
import { uuid, isUuid } from 'uuidv4';
import CreateTaskService from './CreateTaskService';
import  ITaskRepository  from '../repositories/ITaskRepository';
import ICreateTaskDTO from '../dto/ICreateTaskDTO';

describe('CreateTaskService', () => {
  let mockTaskRepository: ITaskRepository;
  let createTask: CreateTaskService;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn().mockImplementation((data: ICreateTaskDTO) => {
        return { id: uuid(), ...data };
      }),
      findById: jest.fn(),
      save: jest.fn(),
      findAllByStatus: jest.fn()
    }
    createTask = new CreateTaskService(mockTaskRepository);
  });

  it('should be able to create a new task', async () => {

    const task = await createTask.execute({
      title:'Lista de tarefas',
      description:'Adicionar a lista de tarefas do dia'
    });
    expect(task).toHaveProperty('id');

  });
});
