import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class LoggingResponse implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        const time = Date.now();
        
        return next.handle().pipe(          //next.nandle forword request to controller and pipe used to run after requestc fullfill
            tap(
                () => console.log(`Required execution time: ${Date.now() - time} ms`)
            ),
            map(
                (data) => {             //map received what controller return like response
                    return{
                        status:true,
                        data:data,
                        message:'Request successful'
                    }
                }
            )
        );
    }
}