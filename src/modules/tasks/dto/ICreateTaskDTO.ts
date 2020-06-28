import { TaskStatus } from "../infra/typeorm/entities/Task";

export default interface ICreateTaskDTO {
  title: string;
  description: string;
  status: TaskStatus;
}