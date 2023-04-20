import { UserRole } from '../../types/user';

export class CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
}
