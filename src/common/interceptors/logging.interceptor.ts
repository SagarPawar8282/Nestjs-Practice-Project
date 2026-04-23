import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class Logging implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>){
        const time=Date.now();
        //console.log(`before conrolller at ${time}:`);
        const req = context.switchToHttp().getRequest();
        //console.log("request: "+req.url) 
        return next.handle().pipe(          //next.handle() send request to controller    //run after controller 
            tap(()=>console.log(`Execution Time :${Date.now()-time} ms`))
        );
    }
}