import { Student } from '../../students/entities';
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

export interface ImportDetails {
  count: number;
  details: string[];
}

export interface ImportErrors {
  csvDuplicates: ImportDetails;
  databaseDuplicates: ImportDetails;
  invalidEmails: ImportDetails;
}

export interface ProcessedStudents {
  addedStudents: Student[];
  errors: ImportErrors;
}
