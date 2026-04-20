import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService) { }

  async validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async customerRedistration(Cust_Reg_Body) {

    const isEmailAlreadyUsed = this.userService.isEmailAlreadyInUse(Cust_Reg_Body.email);

    if (!isEmailAlreadyUsed) {
      return 'email already register!'
    }

    const hashedPassword = await bcrypt.hash(Cust_Reg_Body.password, 10);

    const user = await this.userService.registerCustomer({ ...Cust_Reg_Body, password: hashedPassword });

    const payload = { id: user.users.id, email: user.users.email, role: user.users.roles.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async customerLogin(loginBody) {
    if (!loginBody.email || !loginBody.password) {
      return false;
    }

    const isRegisterUser = await this.userService.isCustomerExits(loginBody.email);

    if (!isRegisterUser) {
      return false;
    }

    const match = await bcrypt.compare(loginBody.password, isRegisterUser.password);

    if (!match) {
      return "bcrypt error"
    }

    const customerDetails = await this.userService.getCustomerDetails(isRegisterUser.id);
    
    const payload = { id: customerDetails.users.id, email: customerDetails.users.email, role: customerDetails.users.roles.name };
    return { access_token: await this.jwtService.signAsync(payload) };

  }

}

