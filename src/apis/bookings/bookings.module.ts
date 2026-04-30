import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingRepositoryProvider } from './bookings.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[ProductModule],
  controllers: [BookingsController,],
  providers: [BookingsService,bookingRepositoryProvider],
  exports:[BookingsService]
})
export class BookingsModule {}
