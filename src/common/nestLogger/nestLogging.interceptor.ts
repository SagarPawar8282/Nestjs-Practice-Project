import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { NestLoggingContextService } from "./nestLogging-context.service";
import { randomUUID } from "node:crypto";

@Injectable()
export class nestLoggingInterceptor implements NestInterceptor {

    constructor(private readonly nestLoggingContextService: NestLoggingContextService) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        const request = context.switchToHttp().getRequest();

        const incommingCorrelationId = request.headers['x-correlation-id'];

        const correlationId = typeof incommingCorrelationId === 'string' && incommingCorrelationId.length > 0 ? incommingCorrelationId : randomUUID();

        return new Observable((subscriber) => {
            this.nestLoggingContextService.run(
                { correlationId },
                () => {
                    next.handle().subscribe({
                        next: (value) => subscriber.next(value),
                        error: (error) => subscriber.error(error),
                        complete: () => subscriber.complete(),
                    });
                }
            );
        });
    }
}