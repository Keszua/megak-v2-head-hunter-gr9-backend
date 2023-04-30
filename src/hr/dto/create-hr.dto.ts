import { IsAlpha, IsEmail, IsPositive, IsString } from 'class-validator';

export class CreateHrDto {
  @IsEmail()
  email: string;

  @IsAlpha()
  fullName: string;

  @IsString()
  company: string;

  @IsPositive()
  maxReservedStudents: number;
}
