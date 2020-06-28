import ICreateTaskDTO from "../dto/ICreateTaskDTO";
import IFindAllByStatusDTO from "../dto/IFindAllByStatusDTO";

export interface ITaskRepository {
  create(data: ICreateTaskDTO): Promise<any>;
  findAllByStatus(data: IFindAllByStatusDTO): Promise<any>;
}