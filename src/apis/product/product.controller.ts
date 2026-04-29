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

  @Put('update-product/:id')
  async updateProductData(@Param('id',ParseIntPipe)id:number,@Body()productData:Object){
    return this.productService.updateProductData(id,productData);
  }
  
  @UseGuards(RoleGuard)
  @Roles('Store','Customer')
  @Get('all-product-under-store')
  async getAllProductUnderStore(@Query('storeId',ParseIntPipe)storeId:number){
    return this.productService.getAllProductUnderStore(storeId);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get('all-product-under-product-category')
  async getAllProductUnderProductCategory(@Query('productCategory')productcategory:string){
    console.log("product Category: "+ productcategory);
    console.log("product Category length: "+productcategory.length);
    return this.productService.getAllProductUnderProductCategory(productcategory);
  }

  @Get('get-all-product-category')
  async getAllProductCategory(@Query('productCategory')productCategory:string){
    return this.productService.getAllProductCategory(productCategory);
  }

  @Get(':id')
  async findOne(@Param ('id',ParseIntPipe)id :number){
    return this.productService.findOne(id);
  }
}
