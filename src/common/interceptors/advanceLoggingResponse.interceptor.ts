import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class AdvanceLoggingResponse implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('advanced logging response interceptor');
        const req = context.switchToHttp().getRequest();

        const start = Date.now();

        //logic for skip some routes
        /*
        if(req.url=='product'){
            console.log('global interceptor but skip for Product')
            return next.handle();
        }
        */


        //dyanamic message 
        const method = req.method;

        let message = 'Request Successful';

        if (method === 'POST') { message = 'Created Successful' }
        if (method === 'GET') { message = 'Fetch Successful' }
        if (method === 'UPDATE') { message = 'Updated Successful' }
        if (method === 'DELETE') { message = 'Deleted Successful' }

        return next.handle().pipe(
            tap(
                () => console.log(`[${req.method}] ${req.url} - ${Date.now() - start}ms`)
            ),
            map(
                (data) => {
                    if (data?.success !== undefined) {             //if data is already formated then return as its.
                        return data;
                    }
                    return {
                        success: true,
                        data: data,
                        message: message
                    }
                }
            )
        )
    }
}