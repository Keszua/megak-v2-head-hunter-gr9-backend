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
}
