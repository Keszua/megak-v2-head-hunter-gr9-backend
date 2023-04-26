import { IsEmail, IsString } from 'class-validator';

import { RegisterRequest } from '../../types';
// TODO add password validation
export class RegisterDto implements RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
