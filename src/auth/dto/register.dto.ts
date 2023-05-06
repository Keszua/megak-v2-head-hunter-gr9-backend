import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { RegisterRequest } from '../../types';
export class RegisterDto implements RegisterRequest {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password. Must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character (!,@,#,$,%,^,&,*). Minimum 8 characters, maximum 24 characters.',
    example: 'Password123!',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/, {
    message:
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character (!,@,#,$,%,^,&,*)',
  })
  password: string;
}
