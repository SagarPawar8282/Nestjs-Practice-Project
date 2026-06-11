import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Post()
  create(@Body() createProductCategoryDto) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productCategoriesService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Get('find-product-category-category-name')
  findProductCategoryByCategoryName(@Query('category')category:string){
      return this.productCategoriesService.findProductCategoryByCategoryName(category)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto) {
    return this.productCategoriesService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoriesService.remove(+id);
  }
}
