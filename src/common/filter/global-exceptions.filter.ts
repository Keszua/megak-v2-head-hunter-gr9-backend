import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientApiResponse, ErrorData, MysqlErrorCodes } from 'src/types';
import { errorMessage, mySqlErrorMessage } from 'src/utils';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

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

  private handleEntityNotFoundError(): ErrorData {
    return {
      error: errorMessage.NOT_FOUND,
      status: HttpStatus.NOT_FOUND,
    };
  }

  private handleQueryFailedError(error: QueryFailedError): ErrorData {
    const { code } = error.driverError;
    const message = this.getMysqlErrorMessage(code);

    return {
      error: message,
      status: HttpStatus.BAD_REQUEST,
    };
  }

  private handleHttpException(error: HttpException): ErrorData {
    return {
      status: error.getStatus(),
      ...(typeof error.getResponse() === 'string'
        ? { error: error.message }
        : (error.getResponse() as ErrorData)),
    };
  }

  private tryToGetErrorData(error: unknown): ErrorData {
    Logger.log(error);

    if (error instanceof EntityNotFoundError) {
      return this.handleEntityNotFoundError();
    }

    if (error instanceof QueryFailedError) {
      return this.handleQueryFailedError(error);
    }

    if (error instanceof HttpException) {
      return this.handleHttpException(error);
    }

    return {
      error: errorMessage.INTERNAL_SERVER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
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
