import { ImportErrors, ImportResultResponse } from '../types';

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
