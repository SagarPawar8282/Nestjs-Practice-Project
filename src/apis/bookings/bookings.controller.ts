import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDto } from './booking.dto';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('booking')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Post('book-product')
  async bookProduct(@Body()bookingInfo:BookingDto){
    return this.bookingsService.bookProduct(bookingInfo);
  }
  
  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get('getBookingDetailsByUserId/:userId')
  async getBookingDetailsByUserId(@Param('userId',ParseIntPipe)userId:number){
    return  this.bookingsService.getBookingDetailsByUserId(userId);
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Get('getSuccessfullyBookedProductOrderForStore/:storeId')
  async getSuccessfullyBookedProductOrderForStore(@Param('storeId',ParseIntPipe)storeId:number){
    return this.bookingsService.getSuccessfullyBookedProductOrderForStore(storeId);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer','Store')
  @Get(':bookingId')
  async getBookingDetailsByBookingId(@Param('bookingId',ParseIntPipe)bookingId:number){
    return this.bookingsService.findOne(bookingId);
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Patch('sendOrderToCustomerOrRejectDelevery/:id')
  async sendOrderToCustomerOrRejectDelevery(@Param('id',ParseIntPipe)id:number,@Body()inputAction:Object){
    return this.bookingsService.sendOrderToCustomerOrRejectDelevery(id,inputAction);
  }

}
