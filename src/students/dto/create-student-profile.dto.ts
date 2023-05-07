import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Min,
} from 'class-validator';

import { ExpectedContractType, ExpectedTypeWork, StudentProfileRequest } from '../../types';

export class CreateStudentProfileDto implements StudentProfileRequest {
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  @ApiProperty({
    description: 'A short bio about the student',
    example: 'Passionate software developer with experience in various web technologies.',
    required: false,
  })
  bio?: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Whether the student can take apprenticeship',
    example: true,
  })
  canTakeApprenticeship: boolean;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  @ApiProperty({
    description: 'Courses the student has completed',
    example: 'Web Development, Machine Learning, Cloud Computing',
    required: false,
  })
  courses?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  @ApiProperty({
    description: 'Education background of the student',
    example: 'Bachelor of Science in Computer Science',
    required: false,
  })
  education?: string;

  @IsEnum(ExpectedContractType)
  @ApiProperty({
    description: 'Expected contract type',
    example: ExpectedContractType.NO_PREFERENCE,
    enum: ExpectedContractType,
  })
  expectedContractType: ExpectedContractType;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  @ApiProperty({
    description: 'Expected salary',
    example: '5000',
    required: false,
  })
  expectedSalary?: string;

  @IsEnum(ExpectedTypeWork)
  @ApiProperty({
    description: 'Expected type of work',
    example: ExpectedTypeWork.HYBRID,
    enum: ExpectedTypeWork,
  })
  expectedTypeWork: ExpectedTypeWork;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: "Student's first name",
    example: 'John',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 39)
  @Matches(/^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/)
  @ApiProperty({
    description: "Student's GitHub username",
    example: 'johndoe',
  })
  githubUsername: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: "Student's last name",
    example: 'Doe',
  })
  lastName: string;

  @Min(0)
  @IsNumber()
  @ApiProperty({
    description: 'Months of commercial experience',
    example: 12,
  })
  monthsOfCommercialExp: number;

  @IsOptional()
  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  @ApiProperty({
    description: 'An array of portfolio URLs',
    example: [
      'https://student-portfolio.com/portfolio1',
      'https://student-portfolio.com/portfolio2',
    ],
    required: false,
  })
  portfolioUrls?: string[];

  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  @ApiProperty({
    description: 'An array of project URLs',
    example: ['https://student-portfolio.com/project1', 'https://student-portfolio.com/project2'],
  })
  projectUrls: string[];

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    description: 'Target work city',
    example: 'San Francisco',
    required: false,
  })
  targetWorkCity?: string;

  @IsOptional()
  @IsString()
  @Length(3, 25)
  @ApiProperty({
    description: 'Telephone number',
    example: '+1-123-456-7890',
    required: false,
  })
  tel?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  @ApiProperty({
    description: 'Work experience description',
    example: '1 year of experience as a web developer at XYZ company.',
    required: false,
  })
  workExperience?: string;
}
