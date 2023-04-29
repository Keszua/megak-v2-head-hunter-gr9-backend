import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ClientApiResponse,
  ErrorData,
  ErrorResponse,
  ErrorResponseBadRequestException,
  MysqlErrorCodes,
} from 'src/types';
import { errorMessage, mySqlErrorMessage } from 'src/utils';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import { UnauthorizedTokenException } from '../exceptions';

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
    if (error instanceof EntityNotFoundError) {
      return this.handleEntityNotFoundError(error);
    } else if (error instanceof QueryFailedError) {
      return this.handleQueryFailedError(error);
    } else if (error instanceof UnauthorizedTokenException) {
      return this.handleUnauthorizedTokenException(error);
    } else if (error instanceof BadRequestException) {
      return this.handleBadRequestException(error);
    } else if (error instanceof HttpException) {
      return this.handleHttpException(error);
    }
    return {
      error: { message: errorMessage.INTERNAL_SERVER_ERROR },
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  private handleEntityNotFoundError(error: EntityNotFoundError): ErrorData {
    Logger.warn(error.message, error.name);
    return {
      error: { message: errorMessage.NOT_FOUND },
      status: HttpStatus.NOT_FOUND,
    };
  }

  private handleQueryFailedError(error: QueryFailedError): ErrorData {
    const { code } = error.driverError;
    const message = this.getMysqlErrorMessage(code);
    Logger.warn(`${message}. Code: ${code}`, error.name);

    return {
      error: { message },
      status: HttpStatus.BAD_REQUEST,
    };
  }

  private handleUnauthorizedTokenException(error: UnauthorizedTokenException): ErrorData {
    const errorResponse = error.getResponse() as ErrorResponse;
    Logger.warn(`${errorResponse.message}. Code: ${errorResponse.code}`, error.name);
    return {
      error: {
        message: errorResponse.message,
        code: 'TOKEN_EXPIRED',
      },
      status: HttpStatus.UNAUTHORIZED,
    };
  }

  private handleBadRequestException(error: BadRequestException): ErrorData {
    const errorResponse = error.getResponse() as ErrorResponseBadRequestException;
    Logger.warn(errorResponse.message, error.name);
    return {
      status: error.getStatus(),
      error: {
        message: errorResponse.message,
      },
    };
  }
  private handleHttpException(error: HttpException): ErrorData {
    const errorResponse = error.getResponse() as string;
    Logger.warn(errorResponse, error.name);
    return {
      status: error.getStatus(),
      error: {
        message: errorResponse,
      },
    };
  }

  private getMysqlErrorMessage(code: string): string {
    const errorMessagesMap: Record<string, string> = {
      [MysqlErrorCodes.ER_DUP_ENTRY]: mySqlErrorMessage.ER_DUP_ENTRY,
      [MysqlErrorCodes.ER_CHECK_CONSTRAINT_VIOLATED]:
        mySqlErrorMessage.ER_CHECK_CONSTRAINT_VIOLATED,
      [MysqlErrorCodes.ER_DATA_TOO_LONG]: mySqlErrorMessage.ER_DATA_TOO_LONG,
      [MysqlErrorCodes.ER_INVALID_DEFAULT]: mySqlErrorMessage.ER_INVALID_DEFAULT,
      [MysqlErrorCodes.ER_LOCK_WAIT_TIMEOUT]: mySqlErrorMessage.ER_LOCK_WAIT_TIMEOUT,
      [MysqlErrorCodes.ER_NO_REFERENCED_ROW]: mySqlErrorMessage.ER_NO_REFERENCED_ROW,
      [MysqlErrorCodes.ER_QUERY_INTERRUPTED]: mySqlErrorMessage.ER_QUERY_INTERRUPTED,
      [MysqlErrorCodes.ER_ROW_IS_REFERENCED]: mySqlErrorMessage.ER_ROW_IS_REFERENCED,
      [MysqlErrorCodes.ER_SYNTAX_ERROR]: mySqlErrorMessage.ER_SYNTAX_ERROR,
      [MysqlErrorCodes.ER_UNSUPPORTED_EXTENSION]: mySqlErrorMessage.ER_UNSUPPORTED_EXTENSION,
      [MysqlErrorCodes.ER_WRONG_VALUE_COUNT]: mySqlErrorMessage.ER_WRONG_VALUE_COUNT,
    };

    const message = errorMessagesMap[code] || errorMessage.INTERNAL_SERVER_ERROR;
    Logger.log(code);
    return message;
  }
}
