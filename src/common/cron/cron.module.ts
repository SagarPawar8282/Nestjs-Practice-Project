import { Module } from "@nestjs/common";
import { QueueCleanUpService } from "./cron.service";
import { QueueProcessorModule } from "../../core/queue-processor/queue-processor.module";
import { BookingsModule } from "src/apis/bookings/bookings.module";

@Module({
    imports:[QueueProcessorModule,BookingsModule],
    providers:[QueueCleanUpService]
})export class CronModule{}