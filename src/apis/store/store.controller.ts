import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

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

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    //return this.storeService.deleteStore(id);
  }

  //@Post('add-bulk-product')
}
