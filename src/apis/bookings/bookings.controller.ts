import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
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

  @Post('create-payment')
  async makePayment(@Body()bookingIdobj:number){
    return this.bookingsService.createPayment(bookingIdobj);
  }

  @Post('update-status-after-payment-getway-call')
  async paymentwebhook(@Body()orderDetailsByGatway:any){
    return this.bookingsService.paymentWebhook(orderDetailsByGatway);
  }

  @Get('verify-payment')
  async checkPaymentReceivedSuccessfully(@Query('bookingId')bookingId:number){
    return this.bookingsService.checkPaymentReceivedSuccessfully(bookingId);
  }
}
