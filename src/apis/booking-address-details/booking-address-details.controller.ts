import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BookingAddressDetailsService } from './booking-address-details.service';
import { BookingAddressDetailsDto } from './booking-address-details.dto';

@Controller('booking-address-details')
export class BookingAddressDetailsController {
  constructor(private readonly bookingAddressDetailsService: BookingAddressDetailsService) {}

  @Post()
  async create(@Body() createBookingAddressDetail:BookingAddressDetailsDto) {
    return this.bookingAddressDetailsService.create(createBookingAddressDetail);
  }

  @Get()
  async findAll() {
    return this.bookingAddressDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    return this.bookingAddressDetailsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookingAddressDetailDto) {
    return this.bookingAddressDetailsService.update(+id, updateBookingAddressDetailDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookingAddressDetailsService.remove(+id);
  }
}
