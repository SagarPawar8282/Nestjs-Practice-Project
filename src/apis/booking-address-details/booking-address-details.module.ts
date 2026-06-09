import { Module } from '@nestjs/common';
import { BookingAddressDetailsService } from './booking-address-details.service';
import { BookingAddressDetailsController } from './booking-address-details.controller';
import { bookingAddressDetailsRepositoryProvider } from './booking-address-details.repository';

@Module({
  imports:[],
  controllers: [BookingAddressDetailsController],
  providers: [BookingAddressDetailsService,bookingAddressDetailsRepositoryProvider],
  exports:[BookingAddressDetailsService]
})
export class BookingAddressDetailsModule {}
