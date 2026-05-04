import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingOrderDetailsService } from './booking-order-details.service';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { OrderAcceptOrRejectDto } from './booking-order-details.dto';

@Controller('booking-order-details')
export class BookingOrderDetailsController {
  constructor(private readonly bookingOrderDetailsService: BookingOrderDetailsService) {}

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Get('get-all-order-should-deliver')
  async allOrderShouldOutOfDelivery(){
    return this.bookingOrderDetailsService.allOrderShouldOutOfDelivery();
  }

  @UseGuards(RoleGuard)
  @Roles('Store')
  @Post('accept-reject-order')
  async acceptOrRejectOrder(@Body() orderAcceptOrRejectDto: OrderAcceptOrRejectDto){
    return this.bookingOrderDetailsService.acceptOrRejectOrder(orderAcceptOrRejectDto);
  }
}
