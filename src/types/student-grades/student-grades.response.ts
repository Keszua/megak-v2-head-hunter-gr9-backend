export interface ImportResultResponse {
  added: ImportDetails;
  errors: ImportErrors;
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
