import { Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { ProductPreristenceModel } from "src/apis/product-persistence/product-persistence.model";
import { PRODUCT_PERSISTENCE_REPOSITORY } from "src/apis/product-persistence/product-persistence.repository";

@Processor('bulk-add-product')
export class QueueProcessor{
    constructor(@Inject(PRODUCT_PERSISTENCE_REPOSITORY)private readonly productRepository:typeof ProductPreristenceModel){}
    
    @Process('bulk-add-product-job')
    async bulkAddProductJob(jobs:Job<any[]>){
       
        try{
            console.log(`Processing job ${jobs.id}`);
            await this.productRepository.bulkCreate(jobs.data);
            console.error(`Job ${jobs.id} completed`);  
        }catch(err){
            console.error(`Job ${jobs.id} failed`, err);
            throw err;
        }
    }
}
