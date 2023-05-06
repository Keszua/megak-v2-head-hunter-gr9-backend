import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPositive, IsString, Max, MaxLength, MinLength } from 'class-validator';
import { HrCreateRequest } from 'src/types';

export class CreateHrDto implements HrCreateRequest {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Janusz Kowalski',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  fullName: string;

  @ApiProperty({
    description: 'Company',
    example: 'Megak Sp. z o.o.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  company: string;

  @ApiProperty({
    description: 'Maximum number of reserved students.',
    example: '5',
  })
  @IsPositive()
  @Max(999)
  maxReservedStudents: number;
}
