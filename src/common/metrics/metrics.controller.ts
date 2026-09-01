import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { Response } from 'express';
import { RoleGuard } from "../decorator/role-guard.guard";
import { Roles } from "../decorator/role.decorator";

@Controller('metrics')
export class MetricController {

    constructor(private readonly metricsService:MetricsService){}

    // @UseGuards(RoleGuard)
    // @Roles('Admin')
    @Get()
    async getMetrics(@Res ()response:Response){
        response.setHeader(
            'content-type',
            this.metricsService.getContentType(),
        );

        response.send(
            await this.metricsService.getMetrics(),
        );
    }
}