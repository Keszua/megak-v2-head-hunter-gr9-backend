import { ErrorResponse } from '../client-api';

export interface ErrorData {
  error: ErrorResponse;
  status: number;
}

export interface ErrorResponseBadRequestException {
  statusCode: number;
  message: string | string[];
}
