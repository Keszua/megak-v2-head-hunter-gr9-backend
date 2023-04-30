import { UserEntity } from '../user';

export interface HrEntity {
  id: string;
  user: UserEntity;
  fullName: string;
  company: string;
  createdAt: Date;
  maxReservedStudents: number;
}
