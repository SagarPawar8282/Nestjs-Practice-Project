import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('add')
  create(@Body() createStoreDto) {
    return this.storeService.create();
  }

  @Get('get-all-product-by-caterory')
  findAll(@Query('product-category')productCategory:string) {
    return this.storeService.findAllProductUnderProductCate(productCategory);
  }

  @Get('job-status/:id')
  async getJobStatus(@Param('id',ParseIntPipe)id:number){
    return await this.storeService.getJobstatus(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto) {
    return this.storeService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }

  //@Post('add-bulk-product')
}
