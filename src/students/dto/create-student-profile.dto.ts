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
  bio?: string;

  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  courses?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  education?: string;

  @IsEnum(ExpectedContractType)
  expectedContractType: ExpectedContractType;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  expectedSalary?: string;

  @IsEnum(ExpectedTypeWork)
  expectedTypeWork: ExpectedTypeWork;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 39)
  @Matches(/^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/)
  githubUsername: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @Min(0)
  @IsNumber()
  monthsOfCommercialExp: number;

  @IsOptional()
  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  portfolioUrls?: string[];

  @IsArray()
  @IsUrl({ require_tld: false }, { each: true })
  projectUrls: string[];

  @IsOptional()
  @IsString()
  @Length(1, 100)
  targetWorkCity?: string;

  @IsOptional()
  @IsString()
  @Length(3, 25)
  tel?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  workExperience?: string;
}
