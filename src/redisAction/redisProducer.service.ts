import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { logger } from "src/common/logger/logger";
import { MetricsService } from "src/common/metrics/metrics.service";
import { NestLoggingContextService } from "src/common/nestLogger/nestLogging-context.service";
import { NestLoggingService } from "src/common/nestLogger/nestLogging.service";
import { RedisService } from "src/common/redis/redis.service";

@Injectable()
export class RedisProducerService {

    constructor(
        private readonly redisService: RedisService,
        public readonly metricService: MetricsService,
        private readonly nestLoggerService:NestLoggingService,
        private readonly loggingContext: NestLoggingContextService,
    ) { }


    @Cron('* * * * *', { name: 'redis-producer', timeZone: 'Asia/Kolkata' })
    async addDataToRedis() {
        try {
            // this.loggingContext.run(
            //     {correlationId:'test-101'},
            //     ()=>{
            //         this.nestLoggerService.log(
            //             {
            //                 event:'cron_job_started',
            //                 service:'RedisProducerService',
            //                 requestId:'demo-101',
            //                 method:'addDataToRedis'
            //             }
            //         )        
            //     }
            // )

            this.nestLoggerService.log({event:'cron_job_started',service:'RedisProducerService',requestId:'demoId111',method:'addDataToRedis'});
            
            const startTime = process.hrtime();
            logger.info('file:RedisService | method:addDataToRedis | Redis producer started');

            for (let i = 1; i <= 10; i++) {
                const key = `demo:data:${Date.now()}:${i}`;

                await this.redisService.set(
                    key,
                    JSON.stringify({
                        id: i,
                        createdAt: new Date().toISOString(),
                    }),
                );

                this.metricService.redisProducerRecordsProcessed.labels({service:'RedisProducerService'}).inc()      //this run per job like 10 currently 

                const result = await this.redisService.get(key);
                
            }
            this.metricService.redisProducerRuns.inc();     //this increament the count inside registry per cron execution 
            logger.info('file:RedisService | method:addDataToRedis | Redis Producer Completed');

            const [seconds, nanoseconds] = process.hrtime(startTime);
            const duration = seconds + nanoseconds / 1e9;
            this.metricService.redisProducerDuration.observe(duration); // here we calculate the total time required to execute the cron shedular 

            this.metricService.redisProducerLastSuccessTimestamp.set(
                Date.now() / 1000,
            );

            this.nestLoggerService.warn({event:'create_error_check_error_metrics',service:'RedisProducerService',requestId:'demo-101',method:'addDataToRedis'})

            throw new Error('error to check redisProducerFailure metrics');
             
        } catch (error) {

            this.metricService.redisProducerFailure.inc();  //this increment when failure occure & count increase inside registry
            logger.error(
                `file:RedisService | method:addDataToRedis | Redis Producer Failed | ${error}`
            );

            this.nestLoggerService.error({event:'cron_job_error',service:'RedisProducerService',requestId:'demo-101',method:'addDataToRedis',error:error})
            throw error;
        }
    }
}