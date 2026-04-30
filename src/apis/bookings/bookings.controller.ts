import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDto } from './booking.dto';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('booking')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Post('buy-product')
  async bookProduct(@Body()bookingInfo:BookingDto){
    return this.bookingsService.bookProduct(bookingInfo);
  }
}
