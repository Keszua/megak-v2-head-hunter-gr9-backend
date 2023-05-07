import { StudentGradesEntity } from '../student-grades';
import { UserEntity } from '../user';

export interface StudentEntity {
  id: string;
  user: UserEntity;
  grades: StudentGradesEntity;
  createdAt: Date;
  updatedAt: Date;
}

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
  expectedTypeWork: string;
  targetWorkCity?: string;
  expectedContractType: string;
  expectedSalary?: string;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
}

export interface EducationAndExperience {
  education?: string;
  courses?: string;
  workExperience?: string;
}
