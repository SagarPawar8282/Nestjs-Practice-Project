import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { NestLoggingContextService } from "src/common/nestLogger/nestLogging-context.service";
import { NestLoggingService } from "src/common/nestLogger/nestLogging.service";

@Processor('email-queue')
export class EmailQueueProcessor {

    constructor(
        private readonly nestLoggingContextService: NestLoggingContextService,
        private readonly nestLoggerService: NestLoggingService
    ) { }

    @Process('email-queue-job')
    async emailSendJob(job: Job<any>) {
        try {
            const correlationId = job.data?.correlationId;

            console.log("job data: " + JSON.stringify(job.data));

            const attemptsMade = job.attemptsMade;
            const currentAttempt = attemptsMade + 1;

            await this.nestLoggingContextService.run(
                { correlationId },
                async () => {
                    this.nestLoggerService.log(
                        {
                            event: 'email-queue-jobs',
                            service: 'EmailQueueProcessor',
                            method: 'emailSendJob',
                            requestId: 'queue-test-id:101',
                            jobId: job.id,
                            attemptsMade: attemptsMade,
                            currentAttempt: currentAttempt
                        }
                    )
                }
            )

            if (attemptsMade === 0) {
                throw new Error('intentianally error to check attemps ')
            }
            return { done: true };
        } catch (error) {
            this.nestLoggerService.error({ event: 'email-queue-jobs', service: 'EmailQueueProcessor', method: 'emailSendJob', requestId: 'queue-test-id:101', error: error })
            throw new Error(error)
        }
    }

}