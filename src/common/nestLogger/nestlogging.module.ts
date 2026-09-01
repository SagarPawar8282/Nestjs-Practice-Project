import { Module } from "@nestjs/common";
import { NestLoggingService } from "./nestLogging.service";
import { NestLoggingContextService } from "./nestLogging-context.service";
import { nestLoggingInterceptor } from "./nestLogging.interceptor";

@Module({
    imports:[],
    providers:[NestLoggingService,NestLoggingContextService,nestLoggingInterceptor],
    exports:[NestLoggingService,NestLoggingContextService,nestLoggingInterceptor]
})export class NestLoggingModule{}