import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerRegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('newCustomer')
  async newCustomerRegistration(@Body()body:CustomerRegisterDto){
    return this.authService.customerRedistration(body);
  }
}
