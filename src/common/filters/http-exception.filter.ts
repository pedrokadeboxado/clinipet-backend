import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const isForeignKeyViolation =
            exception instanceof QueryFailedError &&
            (exception as QueryFailedError & { driverError?: { code?: string } }).driverError?.code === '23503';

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : isForeignKeyViolation
                  ? HttpStatus.BAD_REQUEST
                  : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : isForeignKeyViolation
                  ? { message: 'Registro relacionado não encontrado (verifique os IDs informados)' }
                  : { message: 'Erro interno do servidor' };

        const message =
            typeof errorResponse === 'object' && errorResponse !== null
                ? (errorResponse as { message?: string | string[] }).message ?? 'Erro inesperado'
                : errorResponse;

        const logMessage = `HTTP ${status} - ${request.method} ${request.url} - ${typeof message === 'string' ? message : JSON.stringify(message)}`;

        if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(logMessage, exception instanceof Error ? exception.stack : undefined);
        } else {
            this.logger.warn(logMessage);
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message:
                typeof message === 'string' ? message : Array.isArray(message) ? message : 'Erro inesperado',
        });
    }
}
