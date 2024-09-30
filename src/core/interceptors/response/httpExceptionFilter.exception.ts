import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const validationMessages =
      exceptionResponse && typeof exceptionResponse === 'object'
        ? exceptionResponse['message']
        : null;

    const errorMessage = validationMessages
      ? validationMessages // Validation errors from class-validator
      : exception.message; // Generic message

    response.status(status).json({
      status: false,
      statusCode: status,
      message: errorMessage,
      result: null,
    });
  }
}
