import { HttpStatus } from '@nestjs/common';
interface ResponseSchema {
  dataSchema?: object;
  statusCode: HttpStatus;
  exampleData?: object;
}

export const createResponseSchema = ({
  dataSchema = undefined,
  statusCode,
  exampleData = null,
}: ResponseSchema): object => ({
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    statusCode: { type: 'number' },
    data: dataSchema ?? { type: null },
  },
  example: {
    ok: true,
    statusCode,
    data: exampleData,
  },
});

export const errorResponseSchema = ({
  dataSchema = errorDataSchema,
  statusCode,
  exampleData,
}: ResponseSchema): object => ({
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    statusCode: { type: 'number' },
    error: { ...dataSchema },
  },
  example: {
    ok: false,
    statusCode,
    error: exampleData,
  },
});

const errorDataSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};

export const errorCodeDataSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    code: { type: 'string' },
  },
};
