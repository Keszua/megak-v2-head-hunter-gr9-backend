import { IsEmail, IsEnum } from 'class-validator';

import { UserRole } from '../../types';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;
}
