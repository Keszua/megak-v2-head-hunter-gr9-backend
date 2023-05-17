import { StudentGradesEntity } from '../student-grades';
import { UserEntity } from '../user';

export interface StudentEntity {
  id: string;
  user: UserEntity;
  grades: StudentGradesEntity;
  createdAt: Date;
  updatedAt: Date;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
