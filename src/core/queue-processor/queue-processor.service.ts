import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueProcessorService {
    constructor(
        @InjectQueue('bulk-add-product') private readonly bulkAddProduct: Queue,
        @InjectQueue('email-queue')private readonly EmailQueue : Queue) { }

    async bulkAddProductJob(data: any[]) {
        try {
            console.log("data received in to Queue")
            const job = await this.bulkAddProduct.add(
                'bulk-add-product-job', data,
                {
                    //retry mechanism
                    attempts:3,         //attempt 3 time if fail
                    backoff:5000,        //try after 5 sec
                    priority:1          //this set the priority of job low number means high priority.
                }
            );
            const jobStatus = await job.getState();
            console.log(`job id: ${job.id}, status: ${jobStatus}`);
            console.log("successfully add the job into queue");
            return true;
        } catch (err) {
            throw err.message;
        }
    }

    async emailJob(data:any[]){
        try{
            console.log("data received in email queue");
            await this.EmailQueue.add('email-queue-job',data);
        }catch(error){
            throw error.message;
        }
    }

    async getJobstatus(jobId:number){
        const job= await this.bulkAddProduct.getJob(jobId);

        if(!job){
            return `No job found with id : ${jobId}.`
        }

        return {
            jobId:jobId,
            state:await job.getState(),
            result:job.returnvalue,
            failedReason:job.failedReason,
        }
    }
}
