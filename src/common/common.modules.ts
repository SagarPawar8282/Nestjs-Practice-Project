import { Module } from "@nestjs/common";
import { QueueProcessorModule } from "../core/queue-processor/queue-processor.module";
import { CronModule } from "./cron/cron.module";
import { RedisModule } from "./redis/redis.module";
import { MetricsModule } from "./metrics/metrics.module";
import { NestLoggingModule } from "./nestLogger/nestlogging.module";

@Module({
    imports:[QueueProcessorModule,CronModule,RedisModule,MetricsModule,NestLoggingModule]
})export class CommonModule{}