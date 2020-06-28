import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsDefined } from 'class-validator';

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: ObjectID;
  
  @IsNotEmpty()
  @IsDefined()
  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({name:'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name:'updated_at'})
  updatedAt: Date;
}

export default Role;
