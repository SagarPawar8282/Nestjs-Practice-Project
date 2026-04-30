import { Inject, Injectable, Query } from '@nestjs/common';
import { BOOKING_REPOSITORY } from './bookings.repository';
import { Booking } from './bookings.model';
import { ProductService } from '../product/product.service';
import * as dayjs from 'dayjs';
import { BookingStatus } from 'src/common/enum/bookingStatus.enum';
import { PaymentStatus } from 'src/common/enum/paymentStatus.enum';

@Injectable()
export class BookingsService {
    constructor(
        @Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking,
        private productService: ProductService,
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

            if(!book){
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

}
