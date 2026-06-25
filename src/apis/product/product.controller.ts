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
  @Roles('Customer','Store')
  @Get('all-product-under-product-category')
  async getAllProductUnderProductCategory(
    @Query('productCategory')productcategory:string,@Query('userId')userId?:string){
    return this.productService.getAllProductUnderProductCategory(productcategory,userId);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get('get-all-product-category')
  async getAllProductCategory(){
    return this.productService.getAllProductCategory();
  }

  @UseGuards(RoleGuard)
  @Roles('Customer','Store')
  @Get('All-product-category-under-store/:storeId')
  async findAllProductCategoryUnderStore(@Param('storeId',ParseIntPipe)storeId:number){
    return this.productService.findAllProductCategoryUnderStore(storeId);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get("findAllProduct")
  async findAllProduct(@Query('productName')productName:string,@Query('storeId')storeId?:string){
    return this.productService.findAllProduct(productName,storeId);
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Get("findProductIdByProductNameAndStoreId")
  async findProductIdByProductNameAndStoreId(@Query('productName')productName:string,@Query('storeId',ParseIntPipe)storeId:number){
    return this.productService.findProductIdByProductNameAndStoreId(productName,storeId);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer','Store')
  @Get(':id')
  async findOne(@Param ('id',ParseIntPipe)id :number){
    return this.productService.findOne(id);
  }

  
}
