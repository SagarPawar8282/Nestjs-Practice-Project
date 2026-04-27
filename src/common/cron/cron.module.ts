import { Module } from "@nestjs/common";
import { QueueCleanUpService } from "./cron.service";
import { QueueProcessorModule } from "../../core/queue-processor/queue-processor.module";

@Module({
    imports:[QueueProcessorModule],
    providers:[QueueCleanUpService]
})export class CronModule{}