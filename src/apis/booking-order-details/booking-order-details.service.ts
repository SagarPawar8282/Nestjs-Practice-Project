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

    async allOrderShouldOutOfDelivery() {
        try {
            const orderDetails = await this.queryService.executeQuery(Query.checkOrderShouldOutOfDelivery(), null);
            return orderDetails;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    //refunde
    async acceptOrRejectOrder(orderAcceptOrRejectDto) {
        try {
            const { id, bookingId, details, bookingStatus } = orderAcceptOrRejectDto;

            const booking = await this.bookingService.changeBookingStatus(bookingStatus, bookingId);

            if (booking === false) {
                throw new Error('error during booking order status.');
            }

            const addDetails = await this.bookingOrderDetailsRepository.update({ details: details }, { where: { id: id } });

            let amountRefund;
            if (bookingStatus === 'failed') {
                amountRefund = await this.bookingService.refundAmount(bookingId);
                return amountRefund;
            }
            return addDetails && addDetails[0] === 1 ? true : false;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
