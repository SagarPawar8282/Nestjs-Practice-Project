import { Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { ProductPreristenceModel } from "src/apis/product-persistence/product-persistence.model";
import { PRODUCT_PERSISTENCE_REPOSITORY } from "src/apis/product-persistence/product-persistence.repository";
import { OnQueueCompleted,OnQueueFailed } from "@nestjs/bull";

@Processor('bulk-add-product')
export class QueueProcessor{
    constructor(@Inject(PRODUCT_PERSISTENCE_REPOSITORY)private readonly productRepository:typeof ProductPreristenceModel){}
    
    @Process({name:'bulk-add-product-job',concurrency:5})       //concurrency means number of job can run parallely
    async bulkAddProductJob(jobs:Job<any[]>){
       
        try{
            console.log(`Processing job ${jobs.id}`);
            await this.productRepository.bulkCreate(jobs.data);
              
        }catch(err){
            console.error(`Job ${jobs.id} failed`, err);
            throw err;
        }
        
    }
}
