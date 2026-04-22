import { Module } from "@nestjs/common";
import { QueueProcessorModule } from "./services/queue-processor/queue-processor.module";
import { CronModule } from "./cron/cron.module";

@Module({
    imports:[QueueProcessorModule,CronModule]
})export class CommonModule{}