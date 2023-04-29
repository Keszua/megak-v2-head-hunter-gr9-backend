import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { RegisterRequest } from '../../types';
// TODO add password validation
export class RegisterDto implements RegisterRequest {
  @ApiProperty({
    description: 'Email użytkownika',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Hasło użytkownika',
    example: 'password123',
  })
  @IsString()
  password: string;
}
