import { Module } from '@nestjs/common';
import { BookingOrderDetailsService } from './booking-order-details.service';
import { BookingOrderDetailsController } from './booking-order-details.controller';
import { bookingOrderDetailsRepositoryProvide } from './booking-order-details.repository';
import { BookingsModule } from '../bookings/bookings.module';
import { QueryModule } from 'src/core/query/query.module';

@Module({
  imports:[BookingsModule,QueryModule],
  controllers: [BookingOrderDetailsController],
  providers: [BookingOrderDetailsService,bookingOrderDetailsRepositoryProvide],
  exports:[BookingOrderDetailsService]
})
export class BookingOrderDetailsModule {}
