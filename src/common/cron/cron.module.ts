import { Module } from "@nestjs/common";
import { QueueCleanUpService } from "./cron.service";
import { QueueProcessorModule } from "../../core/queue-processor/queue-processor.module";
import { BookingsModule } from "src/apis/bookings/bookings.module";
import { TestServiceCron } from "./testService.cron";
import { NestLoggingModule } from "../nestLogger/nestlogging.module";
import { MetricsModule } from "../metrics/metrics.module";

@Module({
    imports:[QueueProcessorModule,BookingsModule,QueueProcessorModule,NestLoggingModule,MetricsModule],
    providers:[QueueCleanUpService,TestServiceCron]
})export class CronModule{}