import { ImportDetails, ImportErrors } from './student-grades';

export interface ImportResultResponse {
  added: ImportDetails;
  errors: ImportErrors;
}
