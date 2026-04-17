import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { excludedRoutes } from "excluded.routes";
import { Request } from "express";

@Injectable()
export class canAuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext){
        try{

            const request=context.switchToHttp().getRequest<Request>();
            if(excludedRoutes.includes(request.url.split('?')[0])){
                return true;
            }

        }catch(err){
            console.log(err);
        }

        return true;
    }
}