import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  Index
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsDefined } from "class-validator";

import Role from '@modules/acl/infra/typeorm/schemas/Role';

@Entity('users')
@Index(["email"], { unique: true })
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable:false, unique: true })
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @Column({ nullable:false})
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Column({ nullable:false})
  @Exclude()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @Column(type => Role)
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
