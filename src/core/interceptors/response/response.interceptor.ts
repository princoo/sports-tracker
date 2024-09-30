import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        return this.formatResponse(data, statusCode);
      }),
      catchError((err) => {
        return throwError(() => err); // this will errors globally or let filters take care of it
      }),
    );
  }

  private formatResponse(data: any, statusCode: number) {
    return {
      status: true,
      statusCode,
      result: data,
    };
  }
}
