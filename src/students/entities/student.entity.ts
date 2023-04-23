import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { StudentGrades } from './student-grades.entity';

import { StudentEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity('students')
export class Student extends BaseEntity implements StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.student)
  @JoinColumn()
  user: User;

  @OneToOne(() => StudentGrades, grades => grades.student)
  @JoinColumn()
  grades: StudentGrades;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
