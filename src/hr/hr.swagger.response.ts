import { HttpStatus } from '@nestjs/common';

import {
  createResponseSchema,
  errorResponseSchema,
  hrCreatedResponseExample,
  hrCreatedResponseSchema,
} from '../utils';

export const hrCreatedResponse = {
  description: 'The HR record has been added to the database.',
  schema: createResponseSchema({
    statusCode: HttpStatus.CREATED,
    dataSchema: hrCreatedResponseSchema,
    exampleData: hrCreatedResponseExample,
  }),
};

export const hrBadRequestResponse = {
  description: 'The HR record could not be created.',
  schema: errorResponseSchema({
    statusCode: HttpStatus.BAD_REQUEST,
    exampleData: {
      example1: { message: 'User with this email already exists.' },
      example2: { message: 'Validation failed. Please check your input and try again.' },
    },
  }),
};
