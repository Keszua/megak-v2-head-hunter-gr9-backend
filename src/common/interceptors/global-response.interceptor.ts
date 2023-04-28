import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ClientApiResponse } from 'src/types';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, ClientApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ClientApiResponse<T>> | Promise<Observable<ClientApiResponse<T>>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { statusCode } = response;

    return next.handle().pipe(map(data => ({ ok: true, statusCode, data })));
  }
}
