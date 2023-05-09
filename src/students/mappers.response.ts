import { StudentGrades, StudentProfile } from './entities';

import {
  EducationAndExperience,
  EmploymentExpectations,
  Grades,
  ImportErrors,
  ImportResultResponse,
  Portfolio,
  Profile,
  StudentGradesAndEmpExpectationsResponse,
  StudentProfileAndGrades,
  StudentResponse,
} from '../types';
import { User } from '../users/entities/user.entity';

export const mapProcessedStudentsResponse = (
  addedEmails: string[],
  errors: ImportErrors,
): ImportResultResponse => {
  return {
    added: {
      count: addedEmails.length,
      details: addedEmails,
    },
    errors: {
      csvDuplicates: {
        count: errors.csvDuplicates.details.length,
        details: errors.csvDuplicates.details,
      },
      databaseDuplicates: {
        count: errors.databaseDuplicates.details.length,
        details: errors.databaseDuplicates.details,
      },
      invalidEmails: {
        count: errors.invalidEmails.details.length,
        details: errors.invalidEmails.details,
      },
    },
  };
};

const mapProfile = (studentProfile: StudentProfile, user: User): Profile => ({
  firstName: studentProfile.firstName,
  lastName: studentProfile.lastName,
  tel: studentProfile.tel,
  email: user.email,
  bio: studentProfile.bio,
  githubUsername: studentProfile.githubUsername,
});

const mapGrades = (grades: Grades): Grades => ({
  courseCompletion: grades.courseCompletion,
  courseEngagement: grades.courseEngagement,
  projectDegree: grades.projectDegree,
  teamProjectDegree: grades.teamProjectDegree,
});

const mapPortfolio = (studentProfile: StudentProfile, grades: StudentGrades): Portfolio => ({
  portfolioUrls: studentProfile.portfolioUrls,
  projectUrls: studentProfile.projectUrls,
  bonusProjectUrls: grades.bonusProjectUrls,
});

const mapEmploymentExpectations = (
  studentProfile: EmploymentExpectations,
): EmploymentExpectations => ({
  expectedTypeWork: studentProfile.expectedSalary,
  targetWorkCity: studentProfile.targetWorkCity,
  expectedContractType: studentProfile.expectedContractType,
  expectedSalary: studentProfile.expectedSalary,
  canTakeApprenticeship: studentProfile.canTakeApprenticeship,
  monthsOfCommercialExp: studentProfile.monthsOfCommercialExp,
});

const mapEducationAndExperience = (studentProfile: StudentProfile): EducationAndExperience => ({
  education: studentProfile.education,
  courses: studentProfile.courses,
  workExperience: studentProfile.workExperience,
});

export const mapStudentProfileResponse = (studentProfile: StudentProfile): StudentResponse => {
  const { student } = studentProfile;
  const { user } = student;
  const { grades } = student;
  return {
    studentId: student.id,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
    details: {
      profile: mapProfile(studentProfile, user),
      grades: mapGrades(grades),
      portfolio: mapPortfolio(studentProfile, grades),
      employmentExpectations: mapEmploymentExpectations(studentProfile),
      educationAndExperience: mapEducationAndExperience(studentProfile),
    },
  };
};

export const mapStudentsResponse = (
  studentProfile: StudentProfileAndGrades,
): StudentGradesAndEmpExpectationsResponse => {
  const { grades } = studentProfile;
  const { profile } = studentProfile;

  return {
    studentId: studentProfile.id,
    createdAt: studentProfile.createdAt,
    details: {
      grades: mapGrades(grades),
      employmentExpectations: mapEmploymentExpectations(profile),
    },
  };
};
