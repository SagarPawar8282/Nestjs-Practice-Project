import { Module } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ReportSheduler } from "./report.scheduler";
import { QueueProcessorModule } from "src/core/queue-processor/queue-processor.module";
import { ReportController } from "./report.controller";

@Module({
  imports: [QueueProcessorModule],
  controllers: [ReportController],
  providers: [ReportService, ReportSheduler],
  exports: [ReportService],
})
export class ReportModule {}