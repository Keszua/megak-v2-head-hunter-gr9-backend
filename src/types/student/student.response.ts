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
