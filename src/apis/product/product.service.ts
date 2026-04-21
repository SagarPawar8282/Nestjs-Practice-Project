import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from './product.repository';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(@Inject(PRODUCT_REPOSITORY)private readonly productRepository : typeof Product){}

    async addSingleProduct(productDetails){
        const product = await this.productRepository.create(productDetails);
        return product;
    }
}
