import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>):Observable<any>{
        //console.log("Run before controller")

        return next.handle().pipe(
            map((data)=>{                       //map allow you to modify the response //map received what controller return like response
                return{
                    success:true,
                    data:data,
                    message:'Request successful'
                }
            })
        )
    }
}