/* eslint-disable max-lines-per-function */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import { ClientApiResponse } from '../../types/client-api/client-api.response';
import { ErrorData } from '../../types/error/error-data';
import { MysqlErrorCodes } from '../../types/error/mysql-errors';
import { MySqlErrorMessage } from '../../types/mysql-message/mysql-error.message';
import { ErrorMessage } from '../../utils/error-message/error-message';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ClientApiResponse<null>>>();
    const request = ctx.getRequest<Request>();

    const { status: statusCode, ...errorData } = this.tryToGetErrorData(exception);
    Logger.error({
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
    Logger.log(error);

    //Not found exception 404
    if (error instanceof EntityNotFoundError) {
      return {
        error: ErrorMessage.NotFound,
        status: HttpStatus.NOT_FOUND,
      };
    }

    //DB Query exception 400
    if (error instanceof QueryFailedError) {
      const { code } = error.driverError;
      const message = this.getMysqlErrorMessage(code);

      return {
        error: message,
        status: HttpStatus.BAD_REQUEST,
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

  private getMysqlErrorMessage(code: string): string {
    let message: string;
    switch (code) {
      case MysqlErrorCodes.ER_DUP_ENTRY:
        message = MySqlErrorMessage.ER_DUP_ENTRY;
        break;
      case MysqlErrorCodes.ER_CHECK_CONSTRAINT_VIOLATED:
        message = MySqlErrorMessage.ER_CHECK_CONSTRAINT_VIOLATED;
        break;
      case MysqlErrorCodes.ER_DATA_TOO_LONG:
        message = MySqlErrorMessage.ER_DATA_TOO_LONG;
        break;
      case MysqlErrorCodes.ER_INVALID_DEFAULT:
        message = MySqlErrorMessage.ER_INVALID_DEFAULT;
        break;
      case MysqlErrorCodes.ER_LOCK_WAIT_TIMEOUT:
        message = MySqlErrorMessage.ER_LOCK_WAIT_TIMEOUT;
        break;
      case MysqlErrorCodes.ER_NO_REFERENCED_ROW:
        message = MySqlErrorMessage.ER_NO_REFERENCED_ROW;
        break;
      case MysqlErrorCodes.ER_QUERY_INTERRUPTED:
        message = MySqlErrorMessage.ER_QUERY_INTERRUPTED;
        break;
      case MysqlErrorCodes.ER_ROW_IS_REFERENCED:
        message = MySqlErrorMessage.ER_ROW_IS_REFERENCED;
        break;
      case MysqlErrorCodes.ER_SYNTAX_ERROR:
        message = MySqlErrorMessage.ER_SYNTAX_ERROR;
        break;
      case MysqlErrorCodes.ER_UNSUPPORTED_EXTENSION:
        message = MySqlErrorMessage.ER_UNSUPPORTED_EXTENSION;
        break;
      case MysqlErrorCodes.ER_WRONG_VALUE_COUNT:
        message = MySqlErrorMessage.ER_WRONG_VALUE_COUNT;
        break;
      default:
        message = ErrorMessage.InternalServerError;
        break;
    }
    Logger.log(code);
    return message;
  }
}
