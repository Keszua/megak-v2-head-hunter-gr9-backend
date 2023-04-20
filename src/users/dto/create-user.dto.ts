import { IsEmail, IsEnum, IsString } from 'class-validator';

import { UserRole } from '../../types/user';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
