import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerRegisterDto, LoginDto, storeRegisterDto } from './auth.dto';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('newCustomer')
  async newCustomerRegistration(@Body()body:CustomerRegisterDto){
    return this.authService.customerRegistration(body);
  }

  @Post('login/email')
  async login(@Body()loginBody:LoginDto){
    return this.authService.login(loginBody);
  }

  @Post('newStore')
  async newStoreRegistration(@Body()body:storeRegisterDto){
    return this.authService.storeRegistration(body);
  }

}
