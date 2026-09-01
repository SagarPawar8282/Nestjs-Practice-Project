import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { MetricsService } from "../metrics.service";

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor{

    constructor(private readonly metricsService:MetricsService){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse();

        const startTime = process.hrtime();
        return next.handle().pipe(
            tap({
                next:()=>{
                    this.recordMetrics(request,response,startTime);
                }
            })
        );
    }

    private recordMetrics(request:Request,response:Response,startTime:[number,number]):void{
        const [seconds,nanoseconds]=process.hrtime(startTime);

        const duration =seconds+nanoseconds/1e9;

        const method = request.method;

        const statusCode = null;

        const route = request.url ;

        this.metricsService.httpRequestsTotal.labels(method,route,statusCode).inc();

        this.metricsService.httpRequestDuration.labels(method,route,statusCode).observe(duration);
    }
}