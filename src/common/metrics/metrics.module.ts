import { Module } from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { MetricController } from "./metrics.controller";
import { HttpMetricsInterceptor } from "./interceptor/httpMetricsInterceptor";

@Module({
    imports:[],
    controllers:[MetricController],
    providers:[MetricsService,HttpMetricsInterceptor],
    exports:[MetricsService,HttpMetricsInterceptor],
})export class MetricsModule{}