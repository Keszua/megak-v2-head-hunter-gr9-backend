import { UserEntity } from '../user';

export interface HrEntity {
  id: string;
  user: UserEntity;
  email?: string;
  fullName: string;
  company: string;
  createdAt: Date;
  maxReservedStudents: number;
}
