import { Inject, Injectable, } from '@nestjs/common';
import { BOOKING_REPOSITORY } from './bookings.repository';
import { Booking } from './bookings.model';
import { ProductService } from '../product/product.service';
import * as dayjs from 'dayjs';
import { BookingStatus } from 'src/common/enum/bookingStatus.enum';
import { PaymentStatus } from 'src/common/enum/paymentStatus.enum';
import { QueryService } from 'src/core/query/query.service';
import { Query } from 'src/common/services/query/query';
import { CustomerService } from '../customer/customer.service';
import { ProductPeristenceModel } from '../product-persistence/product-persistence.model';
import { Store } from '../store/store.model';
import { BookingAddressDetails } from '../booking-address-details/booking-address-details.model';
import { BookingAddressDetailsService } from '../booking-address-details/booking-address-details.service';
import { ProductCategory } from '../product-categories/product-categories.model';
import { Customer } from '../customer/customer.model';
import { Model } from 'sequelize';

@Injectable()
export class BookingsService {
    constructor(
        @Inject(BOOKING_REPOSITORY) private readonly bookingRepository: typeof Booking,
        private productService: ProductService, private queryService: QueryService,
        private customerService: CustomerService, private bookingAddressDetailsService: BookingAddressDetailsService

    ) { }

    async bookProduct(bookingInfo) {
        try {
            const { productId, userId, quantity, storeId, totalAmount, address, city, state, isPaymentSuccess } = bookingInfo;

            const customer = await this.customerService.findOne(userId)

            if (!customer) {
                return false;
            }
            const checkProductAvailableUnderStore = await this.productService.findStoreProductComboPresent(storeId, productId);

            if (checkProductAvailableUnderStore === null) {
                return 'product under this store is not available';
            }

            if (checkProductAvailableUnderStore.stock < quantity) {
                return 'required stock is not availble'
            }

            const bookingAddressDetailsRecord = await this.bookingAddressDetailsService.create({ lane: address, city: city, state: state });

            if (!bookingAddressDetailsRecord) {
                throw new Error('something error during booking address details record creation');
            }

            const book = await this.bookingRepository.create({
                productId: productId,
                customerId: customer?.id,
                quantity: quantity,
                orderDate: dayjs().format('YYYY-MM-DD'),         //same like moment but advanced and lightweight
                bookingStatus: BookingStatus.CONFIRMED,
                paymentStatus: isPaymentSuccess ? PaymentStatus.PAID : PaymentStatus.PENDING,
                totalAmount: totalAmount,
                bookingAddressDetailsId: bookingAddressDetailsRecord.id
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
    async getBookingDetailsByUserId(userId) {
        const customer = await this.customerService.findOne(userId);

        const result = await this.bookingRepository.findAll({
            where: { customerId: customer.id },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: ProductPeristenceModel,
                    include: [Store]
                }
            ]
        });
        return result;
    }
    async findOne(bookingId: number) {
        return await this.bookingRepository.findOne({
            where: { id: bookingId },
            include: [
                {
                    model: ProductPeristenceModel,
                    include: [Store, ProductCategory]
                }, {
                    model: BookingAddressDetails
                }
            ]
        });
    }

    async checkUserHadBookedTheProduct(bookingId: number) {
        const result = await this.bookingRepository.findOne({
            where: { id: bookingId, bookingStatus: 'complete' },
        });
        return result;
    }

    async failedMarkForBookedButNotPaid() {
        console.log('failed mark for booked but payment not received');
        await this.queryService.executeQuery(Query.failedMarkForBookedButNotPaid(), null);
    }

    async getSuccessfullyBookedProductOrderForStore(storeId) {
        return await this.bookingRepository.findAll({
            where: { bookingStatus: 'confirmed', paymentStatus: 'paid' },
            include: [
                {
                    model: ProductPeristenceModel,
                    where: { storeId: storeId }
                }
            ]
        })
    }

    async sendOrderToCustomerOrRejectDelevery(id: number, inputAction) {
        try {
            let response;
            let status = inputAction.action === 'accept' ? BookingStatus.OUTFORDELIVERY : BookingStatus.FAILED;
            const result = await this.queryService.executeQuery(Query.sendOrderToCustomerOrRejectDelevery(status, id), null)
            if (result) {
                response = { data: 'accepted' }
                if (inputAction.action === 'reject') {
                    const record = await this.queryService.executeQuery(Query.returnTheAmount(id), null)
                    response = { data: 'rejected' }
                }
            } else {
                response = { data: 'error' }
            }
            return response
        } catch (error) { throw error }
    }
}
