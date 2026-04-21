import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
@Controller('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(RoleGuard)
  @Roles('Customer')
  @Get('test')
  async test(){
    return "test role base authentication";
  }
}
