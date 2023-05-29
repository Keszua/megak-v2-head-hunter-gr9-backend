import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { StudentGrades } from './student-grades.entity';
import { StudentProfile } from './student-profile.entity';

import { StudentEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity('students')
export class Student extends BaseEntity implements StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.student)
  @JoinColumn()
  user: User;

  @OneToOne(() => StudentProfile, profile => profile.student)
  profile: StudentProfile;

  @OneToOne(() => StudentGrades, grades => grades.student)
  grades: StudentGrades;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
