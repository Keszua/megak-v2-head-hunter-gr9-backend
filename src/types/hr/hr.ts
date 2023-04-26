import { UserEntity } from '../user';

export interface HrEntity {
  id: string;
  user: UserEntity;
  email?: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}

export interface HrCreatedResponse {
  id: string;
  fullName: string;
  company: string;
}
