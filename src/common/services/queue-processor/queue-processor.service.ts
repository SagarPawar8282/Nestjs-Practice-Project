import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueProcessorService {
    constructor(@InjectQueue('bulk-add-product') private readonly bulkAddProduct: Queue) { }

    async bulkAddProductJob(data: any[]) {
        try {
            console.log("data received in to Queue")
            await this.bulkAddProduct.add('bulk-add-product-job', data);
            console.log("successfully add the job into queue" );
            return true;
        } catch (err) {
            return err.message;
        }
    }
}
