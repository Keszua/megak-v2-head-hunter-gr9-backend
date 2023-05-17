import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ClientApiResponse,
  ErrorData,
  ErrorResponse,
  ErrorResponseBadRequestException,
} from 'src/types';
import { errorMessage, getMysqlErrorMessage, TokenErrorCodes } from 'src/utils';
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
    } else if (error instanceof NotFoundException) {
      return this.handleNotFoundException(error);
    } else if (error instanceof UnauthorizedTokenException) {
      return this.handleUnauthorizedTokenException(error);
    } else if (error instanceof UnauthorizedException) {
      return this.handleUnauthorizedException(error);
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
    const message = getMysqlErrorMessage(code);
    Logger.warn(`${message}. Code: ${code}`, error.name);

    return {
      error: { message },
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  private handleNotFoundException(error: NotFoundException): ErrorData {
    Logger.warn(error.message, error.name);
    return {
      error: { message: error.message },
      status: HttpStatus.NOT_FOUND,
    };
  }

  private handleUnauthorizedTokenException(error: UnauthorizedTokenException): ErrorData {
    const errorResponse = error.getResponse() as ErrorResponse;
    Logger.warn(`${errorResponse.message}. Code: ${errorResponse.code}`, error.name);
    return {
      error: {
        message: errorResponse.message,
        code: TokenErrorCodes.TOKEN_EXPIRED,
      },
      status: HttpStatus.UNAUTHORIZED,
    };
  }

  private handleUnauthorizedException(error: UnauthorizedException): ErrorData {
    Logger.warn(error.message, error.name);
    return {
      error: { message: error.message },
      status: HttpStatus.UNAUTHORIZED,
    };
  }

  private handleBadRequestException(error: BadRequestException): ErrorData {
    const errorResponse = error.getResponse() as ErrorResponseBadRequestException;
    if (Array.isArray(errorResponse.message)) {
      return this.handleValidationException(errorResponse.message);
    }
    Logger.warn(errorResponse.message, error.name);
    return {
      status: error.getStatus(),
      error: {
        message: errorResponse.message,
      },
    };
  }

  private handleValidationException(messages: string[]): ErrorData {
    Logger.warn(`ValidationError: ${JSON.stringify(messages)}`, 'ValidationException');

    const customErrorMessage = 'Validation failed. Please check your input and try again.';

    return {
      error: { message: customErrorMessage },
      status: HttpStatus.BAD_REQUEST,
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
}
