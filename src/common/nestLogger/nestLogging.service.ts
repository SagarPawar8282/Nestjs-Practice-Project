import { Injectable, Logger } from "@nestjs/common";
import { LogData } from "./interfaces/logData.interface";
import { NestLoggingContextService } from "./nestLogging-context.service";
import { ConfigService } from "@nestjs/config";

export type LogLevel = 'info' | 'error' | 'debug' | 'warn' | 'fatal';
const LOG_LEVEL_PRIORITY = { debug: 10, info: 20, warn: 30, error: 40, fatal: 50 };

@Injectable()
export class NestLoggingService {
    private readonly logger = new Logger();

    private readonly SENSITIVE_FIELDS=[
        'password',
        'token',
        'accessToken',
        'refreshToken',
        'authorization',
        'cookie',
        'secret',
        'apiKey',
        'otp',
    ]

    constructor(
        private readonly nestLoggingContextService: NestLoggingContextService,
        private readonly configService: ConfigService
    ) { }

    log(data: LogData) {
        this.write('info', data);
    }

    warn(data: LogData) {
        this.write('warn', data);
    }

    error(data: LogData) {
        this.write('error', data);
    }

    debug(data: LogData) {
        this.write('debug', data)
    }

    private write(level: LogLevel, data: LogData) {

        const currentPriority = LOG_LEVEL_PRIORITY[level];
        const minimumPriority = LOG_LEVEL_PRIORITY[this.configService.get('LOG_LEVEL')];

        if (currentPriority < minimumPriority) return;

        const processedData = {
            ...data, ...(data?.error ? { error: this.serializeError(data.error) } : {})
        }

        const safeData = this.reduceSensitiveData(processedData)

        const logRecord = {
            timeStamp: new Date().toISOString(),
            level: level,
            correlationId: this.nestLoggingContextService.getCorrelationId(),
            ...safeData
        }

        this.logger[level === 'info' ? 'log' : level](JSON.stringify(logRecord))
    }

    private serializeError(error: unknown) {
        if (error instanceof Error) {
            return {
                name: error.name,
                //stack: error.stack,
                message: error.message
            }
        }
    }

    private reduceSensitiveData(data:unknown){

        if(Array.isArray(data)){
            return data.map((item)=>this.reduceSensitiveData(item));
        }

        if(data !== null && typeof data ==='object'){

            const result:Record<string,unknown>={};

            for(let [key,value] of Object.entries(data)){
                const normalizedKey = key.toLowerCase();
                if(this.SENSITIVE_FIELDS.includes(normalizedKey)){
                   result[key]='[REDACTED]';
                   continue;
                }
                result[key]=this.reduceSensitiveData(value);
            }
            return result;
        }
        return data;
    }
}