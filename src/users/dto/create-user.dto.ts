import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../../types';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsEnum(UserRole)
  role: UserRole;
}
