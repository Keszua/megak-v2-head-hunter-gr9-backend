import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { HrEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity('Hr')
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

  @OneToOne(() => User, user => user.hr)
  @JoinColumn()
  user: User;
}
