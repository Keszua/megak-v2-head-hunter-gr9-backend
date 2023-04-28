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
import { MysqlErrorCodes } from 'src/types/error/mysql-errors';
import { errorMessage, mySqlErrorMessage } from 'src/utils';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import { ClientApiResponse } from '../../types/client-api/client-api.response';
import { ErrorData } from '../../types/error/error-data';

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
        error: errorMessage.NOT_FOUND,
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
      error: errorMessage.INTERNAL_SERVER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  private getMysqlErrorMessage(code: string): string {
    let message: string;
    switch (code) {
      case MysqlErrorCodes.ER_DUP_ENTRY:
        message = mySqlErrorMessage.ER_DUP_ENTRY;
        break;
      case MysqlErrorCodes.ER_CHECK_CONSTRAINT_VIOLATED:
        message = mySqlErrorMessage.ER_CHECK_CONSTRAINT_VIOLATED;
        break;
      case MysqlErrorCodes.ER_DATA_TOO_LONG:
        message = mySqlErrorMessage.ER_DATA_TOO_LONG;
        break;
      case MysqlErrorCodes.ER_INVALID_DEFAULT:
        message = mySqlErrorMessage.ER_INVALID_DEFAULT;
        break;
      case MysqlErrorCodes.ER_LOCK_WAIT_TIMEOUT:
        message = mySqlErrorMessage.ER_LOCK_WAIT_TIMEOUT;
        break;
      case MysqlErrorCodes.ER_NO_REFERENCED_ROW:
        message = mySqlErrorMessage.ER_NO_REFERENCED_ROW;
        break;
      case MysqlErrorCodes.ER_QUERY_INTERRUPTED:
        message = mySqlErrorMessage.ER_QUERY_INTERRUPTED;
        break;
      case MysqlErrorCodes.ER_ROW_IS_REFERENCED:
        message = mySqlErrorMessage.ER_ROW_IS_REFERENCED;
        break;
      case MysqlErrorCodes.ER_SYNTAX_ERROR:
        message = mySqlErrorMessage.ER_SYNTAX_ERROR;
        break;
      case MysqlErrorCodes.ER_UNSUPPORTED_EXTENSION:
        message = mySqlErrorMessage.ER_UNSUPPORTED_EXTENSION;
        break;
      case MysqlErrorCodes.ER_WRONG_VALUE_COUNT:
        message = mySqlErrorMessage.ER_WRONG_VALUE_COUNT;
        break;
      default:
        message = errorMessage.INTERNAL_SERVER_ERROR;
        break;
    }
    Logger.log(code);
    return message;
  }
}
