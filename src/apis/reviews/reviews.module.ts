import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewRepositoryProvider } from './reviews.repository';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports:[BookingsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService,ReviewRepositoryProvider],
})
export class ReviewsModule {}
