import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_DIMENSIONS_REPOSITORY } from './product-dimensions.repository';
import { ProductDimension } from './product-dimensions.model';

@Injectable()
export class ProductDimensionsService {

  constructor(@Inject(PRODUCT_DIMENSIONS_REPOSITORY)private readonly productDimensionRepository:typeof ProductDimension){}

  async create(createProductDimension) {
    return await this.productDimensionRepository.create(createProductDimension);
  }

  async findAll() {
    return `This action returns all productDimensions`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} productDimension`;
  }

  async update(id: number, updateProductDimensionDto) {
    return `This action updates a #${id} productDimension`;
  }

  async remove(id: number) {
    return `This action removes a #${id} productDimension`;
  }
}
