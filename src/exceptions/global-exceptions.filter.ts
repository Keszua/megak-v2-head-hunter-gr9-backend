import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

import { ClientApiResponse } from '../types/client-api/client-api.response';
import { ErrorData } from '../types/error/ErrorData';
import { ErrorMessage } from '../types/messages/error-message/error-message';
import { MySqlErrorMessage } from '../types/messages/mysql-message/mysql-error.message';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ClientApiResponse<null>>>();
    const request = ctx.getRequest<Request>();

    const { status: statusCode, ...errorData } = this.tryToGetErrorData(exception);
    Logger.log({
      statusCode,
      ...errorData,
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    response.status(statusCode).json({
      ok: false,
      statusCode,
      ...errorData,
    });
  }

  private tryToGetErrorData(error: unknown): ErrorData {
    Logger.error(error);
    if (error instanceof EntityNotFoundError) {
      return {
        error: ErrorMessage.NotFound,
        status: HttpStatus.NOT_FOUND,
      };
    }

    if (error instanceof HttpException) {
      return {
        status: error.getStatus(),
        // ...{error: error.message},
        ...(typeof error.getResponse() === 'string'
          ? { error: error.message }
          : (error.getResponse() as ErrorData)),
      };
      // : (error.getResponse() as ErrorData);
    }

    return {
      error: ErrorMessage.InternalServerError,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
