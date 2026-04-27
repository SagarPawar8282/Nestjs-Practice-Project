import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerRegisterDto, LoginDto, StoreRegisterDto } from './auth.dto';
import { RoleGuard } from 'src/common/decorator/role-guard.guard';
import { Roles } from 'src/common/decorator/role.decorator';
//import { Logging } from 'src/common/interceptors/logging.interceptor';

//@UseInterceptors(Logging)
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
  async newStoreRegistration(@Body()body:StoreRegisterDto){
    return this.authService.storeRegistration(body);
  }

}
