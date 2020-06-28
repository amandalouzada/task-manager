import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IsNotEmpty, IsDefined, IsEmail } from 'class-validator';


export enum TaskStatus {
  TO_DO = "to_do",
  DOING = "doing",
  REVIEW = "review",
  DONE="done"
}

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: ObjectID;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    nullable: false,
    default: TaskStatus.TO_DO
  })
  @IsNotEmpty()
  @IsDefined()
  status: TaskStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Task;
