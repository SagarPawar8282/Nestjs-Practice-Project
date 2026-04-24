import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/users.service';
import * as bcrypt from 'bcrypt';
import { QueueProcessorService } from 'src/common/services/queue-processor/queue-processor.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private queueService:QueueProcessorService) { }

  async validateToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async login(loginBody) {
    if (!loginBody.email || !loginBody.password) {
      return false;
    }

    const user = await this.userService.login(loginBody);

    if(!user){
      return 'user credintial false or user not exits';
    }
    const payload = { id: user.users.id, email: user.users.email, role: user.users.roles.name };
    return { access_token: await this.jwtService.signAsync(payload) };

  }

  async customerRegistration(Cust_Reg_Body) {

    const isEmailAlreadyUsed = this.userService.isEmailAlreadyInUse(Cust_Reg_Body.email);

    if (!isEmailAlreadyUsed) {
      return 'email already register!'
    }

    const hashedPassword = await bcrypt.hash(Cust_Reg_Body.password, 10);

    const user = await this.userService.registerCustomer({ ...Cust_Reg_Body, password: hashedPassword });

    await this.queueService.emailJob([Cust_Reg_Body.email]);
    const payload = { id: user.users.id, email: user.users.email, role: user.users.roles.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  
  async storeRegistration(store_reg_body){
    const isEmailAlreadyUsed = this.userService.isEmailAlreadyInUse(store_reg_body.email);

    if(!isEmailAlreadyUsed){
      return 'email is already used';
    }

    const hashedPassword = await bcrypt.hash(store_reg_body.password,10);

    const user = await this.userService.registerStore({...store_reg_body,password:hashedPassword});

    if(!user){
      return 'user not found';
    }

    console.log(user);
    const payload = {id:user.users.id, email:user.users.email, role:user.users.roles.name};
    return {access_token: await this.jwtService.signAsync(payload)};
  }


}

