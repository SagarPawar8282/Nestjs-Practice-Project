import { Module } from "@nestjs/common";
import { RedisModule } from "src/common/redis/redis.module";
import { RedisProducerService } from "./redisProducer.service";
import { RedisCleanUpService } from "./redisCleanup.service";
import { MetricsModule } from "src/common/metrics/metrics.module";
import { NestLoggingModule } from "src/common/nestLogger/nestlogging.module";

@Module({
    imports:[RedisModule,MetricsModule,NestLoggingModule],
    providers:[RedisProducerService,RedisCleanUpService],
    exports:[]
})export class MoniteringModule{}