import { PageMetaDto } from 'src/students/dto';

import { ExpectedContractType, ExpectedTypeWork } from '../student-profile';

export type StudentResponse = {
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
  details: {
    profile: Profile;
    grades: Grades;
    portfolio: Portfolio;
    employmentExpectations: EmploymentExpectations;
    educationAndExperience: EducationAndExperience;
  };
};

export interface Grades {
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
}

export interface Portfolio {
  portfolioUrls: string[];
  projectUrls: string[];
  bonusProjectUrls: string[];
}

export interface Profile {
  firstName: string;
  lastName: string;
  githubUsername: string;
  tel?: string;
  email: string;
  bio?: string;
}

export interface EmploymentExpectations {
  expectedTypeWork: ExpectedTypeWork;
  targetWorkCity?: string;
  expectedContractType: ExpectedContractType;
  expectedSalary?: string;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
}

export interface EducationAndExperience {
  education?: string;
  courses?: string;
  workExperience?: string;
}

export type StudentGradesAndEmpExpectationsResponse = {
  studentId: string;
  createdAt: Date;
  details: {
    grades: Grades;
    employmentExpectations: EmploymentExpectations;
  };
};

export type StudentsPage<T> = {
  students: T[];
  meta: PageMetaDto;
};
