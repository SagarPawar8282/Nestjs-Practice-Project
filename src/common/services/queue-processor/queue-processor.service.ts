import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueProcessorService {
    constructor(@InjectQueue('bulk-add-product') private readonly bulkAddProduct: Queue) { }

    async bulkAddProductJob(data: any[]) {
        try {
            console.log("data received in to Queue")
            const job = await this.bulkAddProduct.add(
                'bulk-add-product-job', data,
                {
                    //retry mechanism
                    attempts:3,         //attempt 3 time if fail
                    backoff:5000        //try after 5 sec
                }
            );
            const jobStatus = await job.getState();
            console.log("job status: "+jobStatus);
            console.log("successfully add the job into queue");
            return true;
        } catch (err) {
            return err.message;
        }
    }
}
