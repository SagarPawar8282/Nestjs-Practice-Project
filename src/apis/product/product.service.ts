import { Inject, Injectable } from '@nestjs/common';
// import { PRODUCT_REPOSITORY } from './product.repository';
// import { Product } from './product.model';
import { QueueProcessorService } from 'src/common/services/queue-processor/queue-processor.service';
import { ProductPreristenceModel } from '../product-persistence/product-persistence.model';
import { PRODUCT_PERSISTENCE_REPOSITORY } from '../product-persistence/product-persistence.repository';

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
            console.log("storeId: " + storeId);

            let jobArray = [];
            for (let product of productDetails) {

                jobArray.push({ ...product, storeId: storeId });

                console.log(`job number: ${number} are added into queue`)
                number++;
            }

            await this.queueService.bulkAddProductJob(jobArray);
            return "add the product are added into queue.";
        } catch (err) {
            return err.message
        }
    }
}
