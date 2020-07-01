import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsDefined, IsEmail } from "class-validator";

import Role from '@modules/acl/infra/typeorm/entities/Role';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: ObjectID;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Column({ nullable: false })
  @Exclude()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ManyToMany(type => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [
      {
        name: 'user_id',
      }],
    inverseJoinColumns: [
      {
        name: 'role_id',
      }
    ]
  })
  roles: Role[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default User;
