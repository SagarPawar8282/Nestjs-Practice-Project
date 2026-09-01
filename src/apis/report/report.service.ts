import { Injectable } from "@nestjs/common";
import { QueueProcessorService } from "src/core/queue-processor/queue-processor.service";

@Injectable()
export class ReportService {
  constructor(private emailQueueService :QueueProcessorService) {}

  async dailyReport() {
    await this.emailQueueService.emailJob([{subject:'demo email-job subject',body:'demo email-job body'}])
    return `daily-report done at : ${Date.now()}`;
  }

  async testReport(){
    
  }
}