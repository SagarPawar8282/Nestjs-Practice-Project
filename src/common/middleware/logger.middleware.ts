import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: any, res: any, next: () => void) {

        const start = Date.now();

        console.log('middleware hit');

        res.on('finish',()=>{
            const end = Date.now();
            console.log(`method : ${req.method}, url : ${req.url}, ${new Date().toDateString()}`)
        })
        next();                 //If you don’t call next()--> request will hang forever
    }
}

//this function is required to call the midddleware from main.ts file 
export function loggerMiddlewares(req:Request,res:Response,next:NextFunction){  
    const middleware = new LoggerMiddleware();
    return middleware.use(req,res,next);
}