import { ExpectedContractType, ExpectedTypeWork } from './student-profile.request';

import { StudentEntity } from '../student';

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

export interface StudentProfileAndGrades {
  id: string;
  createdAt: Date;
  grades: Grades;
  profile: EmploymentExpectations;
}
