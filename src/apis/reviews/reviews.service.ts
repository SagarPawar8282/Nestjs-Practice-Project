import { Inject, Injectable } from '@nestjs/common';
import { ReviewDto } from './review.dto';
import { REVIEW_REPOSITORY } from './reviews.repository';
import { Review } from './reviews.model';
import { BookingsService } from '../bookings/bookings.service';
import { ProductPeristenceModel } from '../product-persistence/product-persistence.model';
import { ProductCategory } from '../product-categories/product-categories.model';
import { Customer } from '../customer/customer.model';
import { Booking } from '../bookings/bookings.model';
import { BookingAddressDetails } from '../booking-address-details/booking-address-details.model';
import { QueryService } from 'src/core/query/query.service';
import { Query } from 'src/common/services/query/query';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly reviewRepository: typeof Review,
    private bookingService: BookingsService,private queryService:QueryService
  ) { }

  async create(createReviewDto: ReviewDto) {
    try {
      const checkBooking = await this.bookingService.checkUserHadBookedTheProduct(createReviewDto.bookingId);
      if (!checkBooking) {
        return 'you have not buy this proudct! you can give review for booked product.'
      }
      const reviewrRecord = await this.reviewRepository.create(createReviewDto)
      return reviewrRecord
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    return `This action returns all reviews`;
  }

  async findAllProductReviewForShop(storeId: number) {
    return await this.reviewRepository.findAll({
      include: [
        {
          model: ProductPeristenceModel,
          where: { storeId: storeId },
          include: [ProductCategory]
        }
      ]
    })
  }

  async findOne(id: number) {
    return this.reviewRepository.findOne({
      where: { id },
      include: [
        {
          model:ProductPeristenceModel,
          include:[ProductCategory]
        },
        {
          model:Customer,
        },
        {
          model:Booking,
          include:[BookingAddressDetails]
        }
      ]
    });
  }

  async update(id: number, updateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    return `This action removes a #${id} review`;
  }

  async calculateRatingAverage(productId:number){
    const reviewObj = await this.queryService.executeQuery(Query.returnRatingTotalAndNumberOfRating(productId),null)
    let average = reviewObj[0]?.sum/reviewObj[0]?.count;
    return Math.round(average*10)/10;
  }
}
