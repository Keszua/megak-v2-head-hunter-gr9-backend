import { StudentEntity } from '../student';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  HR = 'hr',
}

export interface UserEntity {
  id: string;
  email: string;
  hashPwd?: string;
  role: UserRole;
  isActive: boolean;
  student?: StudentEntity;
  createdAt: Date;
  updatedAt: Date;
}
