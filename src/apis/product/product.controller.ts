import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddSingleProductDto, BulkAddProductDto } from './product.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Post('add-product')
  async addproduct(@Body()product:AddSingleProductDto){
    return this.productService.addSingleProduct(product);
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Post('bulk-add-product')
  async bulkAddProduct(@Body()bulkProductDetails:BulkAddProductDto){
    return this.productService.BulkAddProduct(bulkProductDetails);
  }

  @Get(':id')
  async findOne(@Param ('id',ParseIntPipe)id :number){
    return this.productService.findOne(id);
  }

  @Put('update-product/:id')
  async updateProductData(@Param('id',ParseIntPipe)id:number,@Body()productData:Object){
    return this.productService.updateProductData(id,productData);
  }
  
}
