import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingRepositoryProvider } from './bookings.repository';
import { ProductModule } from '../product/product.module';
import { QueryModule } from 'src/core/query/query.module';
import { CustomerModule } from '../customer/customer.module';
import { BookingAddressDetailsModule } from '../booking-address-details/booking-address-details.module';

@Module({
  imports:[ProductModule,QueryModule,CustomerModule,BookingAddressDetailsModule],
  controllers: [BookingsController,],
  providers: [BookingsService,bookingRepositoryProvider],
  exports:[BookingsService]
})
export class BookingsModule {}
