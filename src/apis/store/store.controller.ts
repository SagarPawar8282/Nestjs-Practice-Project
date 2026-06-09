import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @UseGuards(RoleGuard)
  @Roles('Admin')
  @Delete(':id')
  async deleteStore(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.deleteStore(id);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer', 'Admin')
  @Get('getAllStoreCategories')
  async fetchAllStoreCategories() {
    return this.storeService.fetchAllStoreCategories();
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get('fetchCategoryWiseAllStoreWithUserData/:storeCategory')
  async fetchCategoryWiseAllStoreWithUserData(@Param('storeCategory')storeCategory:string){
    return this.storeService.getAllStoreDetailsByStore(storeCategory)
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get('findSimilarStoreFromStoreCategory')
  async findSimilarStoreFromStoreCategory(@Query('storeCategory')storeCategory:string){
    console.log(storeCategory);
    console.log("category:"+storeCategory.trim().length);
    return this.storeService.findSimilarStoreFromStoreCategory(storeCategory);
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Get('fetchStoreDetailsByUserId/:userId')
  async fetchUserDetaisByUserId(@Param('userId',ParseIntPipe)userId:number){
    return this.storeService.fetchUserDetaisByUserId(userId);
  }

  @Get(':shopId')
  async fetchStoreDetails(@Param('shopId', ParseIntPipe) shopId: number) {
    return this.storeService.findOne(shopId)
  }
}
