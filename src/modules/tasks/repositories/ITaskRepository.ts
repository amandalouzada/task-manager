import ICreateTaskDTO from "../dto/ICreateTaskDTO";
import IFindAllByStatusDTO from "../dto/IFindAllByStatusDTO";
import Task from "../infra/typeorm/entities/Task";

export default interface ITaskRepository {
  findById(id:string):Promise<Task | undefined>;
  create(data: ICreateTaskDTO): Promise<Task>;
  findAllByStatus(data: IFindAllByStatusDTO): Promise<Task[]>;
  save(task: Task): Promise<Task>;
}