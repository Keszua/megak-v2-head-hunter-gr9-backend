import { User } from 'src/users/entities/user.entity';

import { Student, StudentGrades, StudentProfile } from './entities';

import {
  EducationAndExperience,
  EmploymentExpectations,
  Grades,
  ImportErrors,
  ImportResultResponse,
  Portfolio,
  Profile,
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

const mapProfile = (studentProfile: StudentProfile, user: User): Profile => ({
  firstName: studentProfile.firstName,
  lastName: studentProfile.lastName,
  tel: studentProfile.tel,
  email: user.email,
  bio: studentProfile.bio,
  githubUsername: studentProfile.githubUsername,
});

const mapGrades = (grades: StudentGrades): Grades => ({
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

const mapEmploymentExpectations = (studentProfile: StudentProfile): EmploymentExpectations => ({
  expectedTypeWork: studentProfile.expectedTypeWork,
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

export const mapStudentProfileResponse = (student: Student): StudentResponse => {
  const { profile, user, grades } = student;

  return {
    studentId: student.id,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
    details: {
      profile: mapProfile(profile, user),
      grades: mapGrades(grades),
      portfolio: mapPortfolio(profile, grades),
      employmentExpectations: mapEmploymentExpectations(profile),
      educationAndExperience: mapEducationAndExperience(profile),
    },
  };
};
