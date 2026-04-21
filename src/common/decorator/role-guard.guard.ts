import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflectore: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        
        const requiredRole = this.reflectore.get<string[]>('roles',context.getHandler());

        if(!requiredRole){
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        return requiredRole.includes(user.role);
    }
}