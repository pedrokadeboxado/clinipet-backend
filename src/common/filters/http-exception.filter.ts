import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: 'Erro interno do servidor' };

        const message =
            typeof errorResponse === 'object' && errorResponse !== null
                ? (errorResponse as { message?: string | string[] }).message ?? 'Erro inesperado'
                : errorResponse;

        const logMessage = `HTTP ${status} - ${request.method} ${request.url} - ${typeof message === 'string' ? message : JSON.stringify(message)}`;
        if (status >= 500) {
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
