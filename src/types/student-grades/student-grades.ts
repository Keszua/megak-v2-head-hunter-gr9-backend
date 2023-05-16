import { ImportErrors } from './student-grades.response';

import { StudentEntity } from '../student';

export interface StudentGradesRequest {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
}

export interface StudentGradesEntity {
  id: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
  student: StudentEntity;
}

export interface ProcessedStudents {
  addedStudents: StudentEntity[];
  errors: ImportErrors;
}
