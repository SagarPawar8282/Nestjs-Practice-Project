import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductDimensionsService {
  create(createProductDimensionDto) {
    return 'This action adds a new productDimension';
  }

  findAll() {
    return `This action returns all productDimensions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productDimension`;
  }

  update(id: number, updateProductDimensionDto) {
    return `This action updates a #${id} productDimension`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDimension`;
  }
}
