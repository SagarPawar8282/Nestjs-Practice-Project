import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductDimensionsService } from './product-dimensions.service';
import { productDimesionDto } from './product-dimensions.dto';

@Controller('product-dimensions')
export class ProductDimensionsController {
  constructor(private readonly productDimensionsService: ProductDimensionsService) {}

  @Post()
  async create(@Body() createProductDimensionDto:productDimesionDto) {
    return this.productDimensionsService.create(createProductDimensionDto);
  }

  @Get()
  async findAll() {
    return this.productDimensionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    return this.productDimensionsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateProductDimensionDto:productDimesionDto) {
    return this.productDimensionsService.update(id, updateProductDimensionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productDimensionsService.remove(+id);
  }
}
