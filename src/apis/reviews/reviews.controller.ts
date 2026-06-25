import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from './review.dto';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createReview:ReviewDto) {
    return this.reviewsService.create(createReview);
  }

  @Get()
  async findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Get('findProductReviewsForShop/:shopId')
  async findAllProductReviewForShop(@Param('shopId',ParseIntPipe)shopId:number){
    return this.reviewsService.findAllProductReviewForShop(shopId);
  }

  @Get('getProductRatingAverage/:productId')
  async calculateRatingAverage(@Param('productId',ParseIntPipe)productId){
    return this.reviewsService.calculateRatingAverage(productId);
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
