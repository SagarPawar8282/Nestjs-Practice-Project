import { Inject, Injectable } from '@nestjs/common';
import { BOOKING_ORDER_DETAIL_REPOSITORY } from './booking-order-details.repository';
import { BookingOrderDetailsModel } from './booking-order-details.model';
import { QueryService } from 'src/core/query/query.service';
import { Query } from 'src/common/services/query/query';
import { BookingsService } from '../bookings/bookings.service';

@Injectable()
export class BookingOrderDetailsService {
    constructor(
        @Inject(BOOKING_ORDER_DETAIL_REPOSITORY) private readonly bookingOrderDetailsRepository: typeof BookingOrderDetailsModel,
        private queryService: QueryService, private bookingService: BookingsService) { }

   
}
