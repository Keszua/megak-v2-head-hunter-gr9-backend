import { HttpStatus } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { unauthorizedExample } from './examples';
import { errorCodeDataSchema, errorResponseSchema } from './schemas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CommonApiInternalServerErrorResponse = (): ClassDecorator =>
  ApiInternalServerErrorResponse({
    description: 'An internal server error occurred while processing the request.',
    schema: errorResponseSchema({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      exampleData: { message: 'Internal server error' },
    }),
  });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CommonApiUnauthorizedResponse = (): ClassDecorator => {
  return ApiUnauthorizedResponse({
    description: 'Unauthorized access',
    schema: errorResponseSchema({
      statusCode: HttpStatus.UNAUTHORIZED,
      exampleData: unauthorizedExample,
      dataSchema: errorCodeDataSchema,
    }),
  });
};
