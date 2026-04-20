import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { excludedRoutes } from "src/excluded.routes";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { canContextService } from "./context/context.service";

@Injectable()
export class CanAuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext) {
        try {

            const request = context.switchToHttp().getRequest<Request>();

            if (excludedRoutes.includes(request.url)) {
                return true;
            }
            const appContext = canContextService.getAppContext();
            const authService = appContext.get(AuthService);
            const token = this.extractAuthorizationHeader(request.headers);

            if(!token){
                return false;
            }

            const isBearerToken = await this.validateTokenAndType(token,'Bearer');

            if(!isBearerToken){
                return false;
            }

            const decodedValue = await this.extractTokenValue(token,authService);

            if(!decodedValue){
                return false;
            }

           request['user'] = decodedValue;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    private extractAuthorizationHeader(headers): string | null {
        if('authorization' in headers){
            return headers['authorization'];
        }
        return null;
    }

    private async validateTokenAndType(token:string,type:string){
        if(!token || !type){
            return false;
        }

        const splittedToken = token.split(' ');
        if(splittedToken.length != 2){
            return false;
        }

        if(splittedToken[0] != type){
            return false;
        }
        return true;
    }

    private extractTokenValue(token:string,authService:AuthService){
        const decode = authService.validateToken(token.split(' ')[1]);
        return decode;
    }
}

