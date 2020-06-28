import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { IsNotEmpty, IsDefined } from 'class-validator';

@Entity('roles')
class Role {
  @ObjectIdColumn()
  id: ObjectID;
  
  @IsNotEmpty()
  @IsDefined()
  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Role;
