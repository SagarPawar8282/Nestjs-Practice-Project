import { Inject, Injectable } from '@nestjs/common';
import { BOOKING_ORDER_DETAIL_REPOSITORY } from '../booking-order-details/booking-order-details.repository';
import { BookingAddressDetails } from './booking-address-details.model';
import { BOOKING_ADDRESS_DETAILS_REPOSITORY} from './booking-address-details.repository';

@Injectable()
export class BookingAddressDetailsService {
  constructor(
    @Inject(BOOKING_ADDRESS_DETAILS_REPOSITORY) private readonly bookingAddressDetailsRespository: typeof BookingAddressDetails) { }

  async create(createBookingAddressDetail) {
    return await this.bookingAddressDetailsRespository.create(createBookingAddressDetail);
  }

  async findAll() {
    return `This action returns all bookingAddressDetails`;
  }

  async findOne(id: number) {
    try {
      return await this.bookingAddressDetailsRespository.findAll();
    } catch (error) {
      console.error(error);
      
      throw new Error(error);
    }
  }

  async update(id: number, updateBookingAddressDetailDto) {
    return `This action updates a #${id} bookingAddressDetail`;
  }

  async remove(id: number) {
    return `This action removes a #${id} bookingAddressDetail`;
  }
}
