import { Module } from "@nestjs/common";
import { QueueCleanUpService } from "./cron.service";
import { QueueProcessorModule } from "../services/queue-processor/queue-processor.module";

@Module({
    imports:[QueueProcessorModule],
    providers:[QueueCleanUpService]
})export class CronModule{}