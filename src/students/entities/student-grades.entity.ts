import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Student } from './student.entity';

import { StudentGradesEntity } from '../../types';

@Entity('student_grades')
export class StudentGrades extends BaseEntity implements StudentGradesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: false })
  courseCompletion: number;

  @Column({ type: 'float', nullable: false })
  courseEngagement: number;

  @Column({ type: 'float', nullable: false })
  projectDegree: number;

  @Column({ type: 'float', nullable: false })
  teamProjectDegree: number;

  @Column({ type: 'simple-array', nullable: true })
  bonusProjectUrls: string[];

  @OneToOne(() => Student, student => student.grades)
  student: Student;
}
