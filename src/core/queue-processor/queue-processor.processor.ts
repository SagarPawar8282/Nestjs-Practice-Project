import { Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { ProductPeristenceModel } from "src/apis/product-persistence/product-persistence.model";
import { PRODUCT_PERSISTENCE_REPOSITORY } from "src/apis/product-persistence/product-persistence.repository";
import { OnQueueCompleted, OnQueueFailed } from "@nestjs/bull";

@Processor('bulk-add-product')
export class QueueProcessor {
    constructor(@Inject(PRODUCT_PERSISTENCE_REPOSITORY) private readonly productRepository: typeof ProductPeristenceModel) { }

    @Process({ name: 'bulk-add-product-job', concurrency: 5 })       //concurrency means number of job can run parallely
    async bulkAddProductJob(jobs: Job<any[]>) {

        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        try {
            console.log(`Processing job ${jobs.id}`);
            //await this.productRepository.bulkCreate(jobs.data);

            //for loop used to see the bull doshboard activeity 
            /*
            for(let job of jobs.data){
                await this.productRepository.create(job);
                await sleep(5000);
            }
            */

            //for loop for see the actual progrss on the bashboard 
            //let dataArray = [];                 //array are used due to retry-mechanism, duplicate entry should not generate in db.
            //http://localhost:3000/admin/queues
            
            for(let i=0;i<jobs.data.length;i++){
                await sleep(5000);
                
                if(i==3 || i==4){
                    throw new Error('Intentional failure at index 3');
                }
                const progress = Math.round((i+1)/jobs.data.length*100);
                await jobs.progress(progress);
                await this.productRepository.create(jobs.data[i]);
                //dataArray.push(jobs.data[i]);
            }
            //await this.productRepository.bulkCreate(dataArray);
            return { done:true };

        } catch (err) {
            console.error(`Job ${jobs.id} failed`, err);
            throw err;
        }

    }


}
