import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('email-queue')
export class EmailQueueProcessor{

    @Process('email-queue-job')
    async emailSendJob(jobs: Job<any[]>){
        console.log(jobs.data.map(r=>r.email));
        return {done:true}
    }
}