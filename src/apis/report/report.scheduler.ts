import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ReportService } from "./report.service";

@Injectable()
export class ReportSheduler {
  constructor(private readonly reportService: ReportService) {}

  @Cron("45 14 * * *", {
    name: "daily-report",
    timeZone: "Asia/Kolkata",
  })
  async dailyReport() {
    const response = await this.reportService.dailyReport();
    console.log(response);
  }
}