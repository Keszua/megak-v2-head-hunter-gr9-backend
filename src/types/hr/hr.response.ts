import { UserRole } from '../user';

export interface HrCreatedResponse {
  id: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
