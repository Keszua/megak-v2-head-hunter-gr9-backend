import { User } from 'src/users/entities/user.entity';

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

const mapOneStudentProfile = (studentProfile: Profile): Profile => ({
  firstName: studentProfile.firstName,
  lastName: studentProfile.lastName,
  tel: studentProfile.tel,
  email: studentProfile.email,
  bio: studentProfile.bio,
  githubUsername: studentProfile.githubUsername,
});

const mapProfile = (studentProfile: StudentProfile, user: User): Profile => ({
  firstName: studentProfile.firstName,
  lastName: studentProfile.lastName,
  tel: studentProfile.tel,
  email: user.email,
  bio: studentProfile.bio,
  githubUsername: studentProfile.githubUsername,
});

const mapOneStudentGrades = (grades: Grades): Grades => ({
  courseCompletion: grades.courseCompletion,
  courseEngagement: grades.courseEngagement,
  projectDegree: grades.projectDegree,
  teamProjectDegree: grades.teamProjectDegree,
});

const mapGrades = (grades: StudentGrades): Grades => ({
  courseCompletion: grades.courseCompletion,
  courseEngagement: grades.courseEngagement,
  projectDegree: grades.projectDegree,
  teamProjectDegree: grades.teamProjectDegree,
});

const mapOneUserPortfolio = (studentProfile: Portfolio): Portfolio => ({
  portfolioUrls: studentProfile.portfolioUrls,
  projectUrls: studentProfile.projectUrls,
  bonusProjectUrls: studentProfile.bonusProjectUrls,
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

const mapEducationAndExperience = (
  studentProfile: EducationAndExperience,
): EducationAndExperience => ({
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

export const mapGetOneStudentProfileResponse = (
  studentProfile: StudentResponse,
): StudentResponse => {
  const { studentId, createdAt, updatedAt } = studentProfile;
  const { details } = studentProfile;

  return {
    studentId,
    createdAt: createdAt,
    updatedAt: updatedAt,
    details: {
      profile: mapOneStudentProfile(details.profile),
      grades: mapOneStudentGrades(details.grades),
      portfolio: mapOneUserPortfolio(details.portfolio),
      employmentExpectations: mapEmploymentExpectations(details.employmentExpectations),
      educationAndExperience: mapEducationAndExperience(details.educationAndExperience),
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
      grades: mapOneStudentGrades(grades),
      employmentExpectations: mapEmploymentExpectations(profile),
    },
  };
};
