import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { MetricsModule } from "../metrics/metrics.module";

@Module({
    imports:[MetricsModule],
    controllers:[],
    providers:[RedisService],
    exports:[RedisService]
})export class RedisModule{}