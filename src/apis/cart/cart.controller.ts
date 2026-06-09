import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { CreateCartDto, UpdateCartDto } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  create(@Body() createCartData:CreateCartDto) {
    return this.cartService.create(createCartData);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get('getAllAddedDetailsByUserId/:customerId')
  findAllAddedDetailsbyUserId(@Param('customerId',ParseIntPipe)customerId:number) {
    return this.cartService.findAllAddedDetailsbyUserId(customerId);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCartDto:UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.cartService.remove(id);
  }
}
