import { injectable, inject } from "tsyringe";
import { ITaskRepository } from "../repositories/ITaskRepository";

interface IFindAllByStatusRequest {
  status: string;
}

@injectable()
export default class ListTaskByStatusService {

  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository
  ) { }

  async execute({ status }: IFindAllByStatusRequest): Promise<any> {
    const listStatus = status.replace(/ /g, '').split(',');
    const task = await this.taskRepository.findAllByStatus({ status: listStatus });
    return task;
  }
}