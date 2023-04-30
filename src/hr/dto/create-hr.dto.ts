import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsPositive, IsString, Max } from 'class-validator';
import { HrCreateRequest } from 'src/types';

export class CreateHrDto implements HrCreateRequest {
  @ApiProperty({
    description: 'Email użytkownika',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Pełna nazwa użytkownika',
    example: 'Janusz Kowalski',
  })
  @IsAlpha()
  fullName: string;

  @ApiProperty({
    description: 'Firma',
    example: 'Megak Sp. z o.o.',
  })
  @IsString()
  company: string;

  @ApiProperty({
    description: 'Maksymalna ilość zapisanych kursantów.',
    example: '5',
  })
  @IsPositive()
  @Max(999)
  maxReservedStudents: number;
}
