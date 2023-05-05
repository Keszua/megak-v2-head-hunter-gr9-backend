import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Student } from './student.entity';

import { ExpectedContractType, ExpectedTypeWork, StudentProfileEntity } from '../../types';

@Entity('student_profiles')
export class StudentProfile extends BaseEntity implements StudentProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, length: 25 })
  tel?: string;

  @Column({ nullable: false, length: 50 })
  firstName: string;

  @Column({ nullable: false, length: 50 })
  lastName: string;

  @Column({ unique: true, nullable: false, length: 39 })
  githubUsername: string;

  @Column({ type: 'simple-array', nullable: true })
  portfolioUrls?: string[];

  @Column({ type: 'simple-array', nullable: false })
  projectUrls: string[];

  @Column({ type: 'text', nullable: true, length: 1000 })
  bio?: string;

  @Column({
    type: 'enum',
    enum: ExpectedTypeWork,
    nullable: false,
    default: ExpectedTypeWork.NO_PREFERENCE,
  })
  expectedTypeWork: ExpectedTypeWork;

  @Column({ nullable: true, length: 100 })
  targetWorkCity?: string;

  @Column({
    type: 'enum',
    enum: ExpectedContractType,
    nullable: false,
    default: ExpectedContractType.NO_PREFERENCE,
  })
  expectedContractType: ExpectedContractType;

  @Column({ nullable: true, length: 10 })
  expectedSalary?: string;

  @Column({ nullable: false, default: false })
  canTakeApprenticeship: boolean;

  @Column({ nullable: false, default: 0 })
  monthsOfCommercialExp: number;

  @Column({ type: 'text', nullable: true, length: 2000 })
  education?: string;

  @Column({ type: 'text', nullable: true, length: 2000 })
  workExperience?: string;

  @Column({ type: 'text', nullable: true, length: 2000 })
  courses?: string;

  @OneToOne(() => Student, student => student.profile)
  student: Student;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
