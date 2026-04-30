import { Inject, Injectable, } from '@nestjs/common';
import { BOOKING_REPOSITORY } from './bookings.repository';
import { Booking } from './bookings.model';
import { ProductService } from '../product/product.service';
import * as dayjs from 'dayjs';
import { BookingStatus } from 'src/common/enum/bookingStatus.enum';
import { PaymentStatus } from 'src/common/enum/paymentStatus.enum';
import { QueryService } from 'src/core/query/query.service';
import { Query } from 'src/common/services/query/query';

@Injectable()
export class BookingsService {
    constructor(
        @Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking,
        private productService: ProductService, private queryService: QueryService,
    ) { }

    async bookProduct(bookingInfo) {
        try {
            const { productId, customerId, quantity, storeId, totalAmount } = bookingInfo;

            //this method remove after frontend ui made because customer can see only those store whose sell this perticular product  
            const checkProductAvailableUnderStore = await this.productService.findStoreProductComboPresent(storeId, productId);

            if (checkProductAvailableUnderStore === null) {
                return 'product under this store is not available';
            }

            if (checkProductAvailableUnderStore.stock < quantity) {
                return 'required stock is not availble'
            }

            const book = await this.bookingRepository.create({
                productId: productId,
                customerId: customerId,
                quantity: quantity,
                orderDate: dayjs().format('YYYY-MM-DD'),         //same like moment but advanced and lightweight
                bookingStatus: BookingStatus.PENDING,
                paymentStatus: PaymentStatus.PENDING,
                totalAmount: totalAmount
            });

            if (!book) {
                throw new Error('error during product booking');
            }

            const updatedStock = checkProductAvailableUnderStore.stock - quantity;
            const reduceStock = await this.productService.reduceStockForBooking(productId, updatedStock);

            if (reduceStock === false) {
                return 'unexcepected Error during stock reduction'
            }

            return book;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    //after booking this api call, after executing this method response send to frontend 
    //frontend receive this response 
    //Frontend opens gateway SDK/UI.send this response to this 
    //after receiving this response it accept the amount and call out backend for status update 
    //notify the frontend as successful event 
    async createPayment(id: number) {
        const booking = await this.bookingRepository.findOne({ where: { id: id } });

        if (!booking) {
            throw new Error('booking not found');
        }

        if (booking.paymentStatus === 'paid') {
            throw new Error('already paid');
        }

        //fake geteway payment order creation

        const order = {
            gatewayPaymentId: `PAY_${Date.now()}`,
            bookingId: id,
            amount: booking.totalAmount,
            status: booking.paymentStatus
        }

        return order;
    }

    //this method call by payment gateway internally after receiving payment successfully
    // parallelly it notify the  the front end , but we should not depend on gateway response in frontend for payment conformation 
    // it should call other api to check payment received and show on ui.
    async paymentWebhook(orderDetails) {

        if (!orderDetails) {
            throw new Error('could not find order details')
        }

        const { bookingId, status } = orderDetails;

        if (status === 'SUCCESS') {
            const changeStatus = await this.bookingRepository.update(
                {
                    paymentStatus: PaymentStatus.PAID,
                    bookingStatus: BookingStatus.CONFIRMED
                },
                {
                    where: { id: bookingId }
                });

            return { message: `payment successfully` }
        }
        if (status === 'FAILED') {
            const changeStatus = await this.bookingRepository.update(
                {
                    paymentStatus:PaymentStatus.FAILED,

                },
                {
                    where: { id: bookingId }
                });
            return {message : 'payment failed' }
        }
    }

    async checkPaymentReceivedSuccessfully(bookingId:number){
        const status = await this.queryService.executeQuery(Query.checkPaymentReceivedSuccessfully(bookingId),null);
        return status;
    }
}
