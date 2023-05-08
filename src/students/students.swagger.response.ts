import { HttpStatus } from '@nestjs/common';

import {
  createResponseSchema,
  errorResponseSchema,
  importStudentsResultResponseExample,
  importStudentsResultResponseSchema,
  studentProfileResponseExample,
  studentProfileResponseSchema,
} from '../utils';

export const importStudentsOkResponse = {
  description: 'Students imported successfully',
  schema: createResponseSchema({
    statusCode: HttpStatus.OK,
    dataSchema: importStudentsResultResponseSchema,
    exampleData: importStudentsResultResponseExample,
  }),
};

export const importStudentsBadRequestResponse = {
  description: 'Invalid file type. Only CSV files are allowed.',
  schema: errorResponseSchema({
    statusCode: HttpStatus.BAD_REQUEST,
    exampleData: { message: 'Invalid file type. Only CSV files are allowed.' },
  }),
};

export const studentProfileCreatedResponse = {
  description: 'Student profile created successfully',
  schema: createResponseSchema({
    statusCode: HttpStatus.CREATED,
    dataSchema: studentProfileResponseSchema,
    exampleData: studentProfileResponseExample,
  }),
};
