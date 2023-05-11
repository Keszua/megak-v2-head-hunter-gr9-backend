import { PageMetaDto } from 'src/students/dto';

import {
  EducationAndExperience,
  EmploymentExpectations,
  Grades,
  Portfolio,
  Profile,
} from './student';

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
