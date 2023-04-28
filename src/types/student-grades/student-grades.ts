export interface StudentGrade {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string;
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
  addedEmails: string[];
  errors: ImportErrors;
}
