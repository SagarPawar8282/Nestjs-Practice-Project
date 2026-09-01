import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

interface LogContext{
    correlationId:string
}

@Injectable()
export class NestLoggingContextService{
    
    private readonly storage = new AsyncLocalStorage<LogContext>();

    run<T>(context:LogContext,callback:()=>T):T{
        return this.storage.run(context,callback);
    }

    getCorrelationId():string | undefined {
        return this.storage.getStore()?.correlationId;
    }
}