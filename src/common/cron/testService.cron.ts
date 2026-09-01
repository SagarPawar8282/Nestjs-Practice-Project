import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { Queue } from "bull";
import { NestLoggingContextService } from "../nestLogger/nestLogging-context.service";
import { randomUUID } from "node:crypto";
import { MetricsService } from "../metrics/metrics.service";

@Injectable()
export class TestServiceCron {

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        @InjectQueue('email-queue') private readonly emailQueue: Queue,
        private readonly nestLoggingContextService: NestLoggingContextService,
        private readonly metricsService:MetricsService
    ) { }

    @Cron('* * * * *', { name: 'test-cron' },)
    async test() {
        //for cron job thier is no context because context is created at interceptor level in cron case no interceptor hit 
        await this.emailQueue.add(
            'email-queue-job',
            { name: 'sagar', email: 'sagarpawar7182@gmail.com', to: 'test123@gmail.com', message: 'hello', correlationId: randomUUID() },
            {
                attempts: 3,
                //delay: 10_000,     //this line handover job to worker after 10 sec
                priority: 1,
                backoff: {
                    type: 'exponential',
                    delay: 1000    //this line retry the job after failure.it attemp 3 time after 1 sec exponentialy
                },
            }
        );
        const jobName='test-cron'
        this.metricsService.queueJob.labels(jobName).inc();
    }
}