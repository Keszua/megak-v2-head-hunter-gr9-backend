import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { HrEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity('hr')
export class Hr extends BaseEntity implements HrEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    default: null,
    length: 255,
  })
  fullName: string;

  @Column({
    nullable: true,
    default: null,
    length: 255,
  })
  company: string;

  @Column({ type: 'smallint', nullable: false, unsigned: true })
  maxReservedStudents: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, user => user.hr)
  @JoinColumn()
  user: User;
}
