import { Module } from "@nestjs/common";
import { QueueProcessorModule } from "./services/queue-processor/queue-processor.module";

@Module({
    imports:[QueueProcessorModule]
})export class CommonModule{}