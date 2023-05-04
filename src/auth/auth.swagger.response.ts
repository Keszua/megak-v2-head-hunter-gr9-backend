import { HttpStatus } from '@nestjs/common';

import {
  createResponseSchema,
  errorCodeDataSchema,
  errorResponseSchema,
  unauthorizedExample,
  userResponseExample,
  userResponseSchema,
} from '../utils';

export const registerOkResponse = {
  description: 'User registered and account activated',
  schema: createResponseSchema({ statusCode: HttpStatus.OK }),
};

export const registerBadRequestResponse = {
  description: 'User already registered',
  schema: errorResponseSchema({
    statusCode: HttpStatus.BAD_REQUEST,
    exampleData: { message: 'User already registered' },
  }),
};

export const loginOkResponse = {
  description: 'User logged in and tokens in cookies',
  schema: createResponseSchema({
    statusCode: HttpStatus.OK,
    dataSchema: userResponseSchema,
    exampleData: userResponseExample,
  }),
};

export const loginUnauthorizedResponse = {
  description: 'Invalid login credentials',
  schema: errorResponseSchema({
    dataSchema: errorCodeDataSchema,
    statusCode: HttpStatus.UNAUTHORIZED,
    exampleData: unauthorizedExample,
  }),
};

export const refreshTokensOkResponse = {
  description: 'Tokens refreshed and returned in cookies',
  schema: createResponseSchema({
    statusCode: HttpStatus.OK,
    dataSchema: userResponseSchema,
    exampleData: userResponseExample,
  }),
};

export const refreshTokensUnauthorizedResponse = {
  description: 'Invalid refresh token',
  schema: errorResponseSchema({
    dataSchema: errorCodeDataSchema,
    statusCode: HttpStatus.UNAUTHORIZED,
    exampleData: unauthorizedExample,
  }),
};

export const logoutOkResponse = {
  description: 'User logged out',
  schema: createResponseSchema({ statusCode: HttpStatus.OK }),
};

export const logoutUnauthorizedResponse = {
  description: 'Invalid authentication token',
  schema: errorResponseSchema({
    dataSchema: errorCodeDataSchema,
    statusCode: HttpStatus.UNAUTHORIZED,
    exampleData: unauthorizedExample,
  }),
};
