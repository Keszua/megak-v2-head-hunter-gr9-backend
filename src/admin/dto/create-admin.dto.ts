import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
