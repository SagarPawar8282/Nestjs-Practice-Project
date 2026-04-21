import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddSingleProductDto } from './product.dto';

@Controller('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add-product')
  async addproduct(@Body()product:AddSingleProductDto){
    return this.productService.addSingleProduct(product);
  }
}
