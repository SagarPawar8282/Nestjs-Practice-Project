import { Inject, Injectable } from '@nestjs/common';
// import { PRODUCT_REPOSITORY } from './product.repository';
// import { Product } from './product.model';
import { QueueProcessorService } from 'src/common/services/queue-processor/queue-processor.service';
import { ProductPreristenceModel } from '../product-persistence/product-persistence.model';
import { PRODUCT_PERSISTENCE_REPOSITORY } from '../product-persistence/product-persistence.repository';
import { logger } from 'src/common/logger/logger';

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_PERSISTENCE_REPOSITORY) private readonly productRepository: typeof ProductPreristenceModel,
        private queueService: QueueProcessorService,) { }

    async addSingleProduct(productDetails) {
        const product = await this.productRepository.create(productDetails);
        return product;
    }

    async BulkAddProduct(bulkProductDetails) {
        try {
            let number = 1;
            const { storeId, productDetails } = bulkProductDetails;

            let jobArray = [];
            for (let product of productDetails) {

                jobArray.push({ ...product, storeId: storeId });

                number++;
            }

            await this.queueService.bulkAddProductJob(jobArray);
            return "Product are successfully added into the Queue";
        } catch (err) {
            logger.info(`Logger :- Error : ${err.message}`);
            throw err;
        }
    }

    async findOne(id: number) {
        try {
            return this.productRepository.findOne({ where: { id: id } });
        } catch (err) {
            logger.info(`Logger :- Error: ${err.message}`);
            throw err;
        }
    }

    async getJobStatus(id: number) {
        return await this.queueService.getJobstatus(id);
    }

    async findAllProductUnderProductCategory(productCategory: string) {
        try {
            const name = productCategory;
            const record = await this.productRepository.findAll({ where: { name: productCategory.trim() } });
            return record;
        } catch (err) {
            logger.info(`Logger :- Error: ${err.message}`);
            throw err;
        }
    }
}
