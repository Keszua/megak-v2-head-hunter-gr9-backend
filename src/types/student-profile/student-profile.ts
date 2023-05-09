import { EmploymentExpectations, Grades, Profile, StudentEntity } from '../student';

export interface StudentProfileEntity {
  id: string;
  tel?: string;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls?: string[];
  projectUrls: string[];
  bio?: string;
  expectedTypeWork: ExpectedTypeWork;
  targetWorkCity?: string;
  expectedContractType: ExpectedContractType;
  expectedSalary?: string;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education?: string;
  workExperience?: string;
  courses?: string;
  student: StudentEntity;
  createdAt: Date;
  updatedAt: Date;
}

export enum ExpectedTypeWork {
  ONSITE = 'onsite',
  RELOCATION_READY = 'relocation_ready',
  REMOTE_ONLY = 'remote_only',
  HYBRID = 'hybrid',
  NO_PREFERENCE = 'no_preference',
}

export enum ExpectedContractType {
  UOP_ONLY = 'uop_only',
  B2B_POSSIBLE = 'b2b_possible',
  UZ_UOD_POSSIBLE = 'uz_uod_possible',
  NO_PREFERENCE = 'no_preference',
}

export interface StudentProfileAndGrades {
  id: string;
  createdAt: Date;
  grades: Grades;
  profile: EmploymentExpectations;
}
