import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/users.service';
import * as bcrypt from 'bcrypt';
import { QueueProcessorService } from 'src/core/queue-processor/queue-processor.service';
import { StoreService } from 'src/apis/store/store.service';
import { CustomerService } from 'src/apis/customer/customer.service';
import { AdminService } from 'src/apis/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private queueService: QueueProcessorService,
    private storeService: StoreService,
    private customerService: CustomerService,
    private adminService :AdminService) { }

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

    const isRegisterUser = await this.userService.isEmailExits(loginBody.email);

    if (!isRegisterUser) {
      return 'user with email is not register';
    }

    const match = await bcrypt.compare(loginBody.password, isRegisterUser.password);

    if (!match) {
      return 'incorrect password';
    }


    let user;

    if (isRegisterUser.roleId === 2) {
      user = await this.customerService.getCustomerDetailsByUserId(isRegisterUser.id);
    }
    else if (isRegisterUser.roleId === 3) {
      user = await this.storeService.getStoreDetailsByUserId(isRegisterUser.id);
    } else if(isRegisterUser.roleId === 1){
      user = await this.adminService.getAdminDetailsByUserId(isRegisterUser.id);
    }else {
      return null;
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

    const customerInfo = {
      name: Cust_Reg_Body.name,
      address: Cust_Reg_Body.address,
      phoneNumber: Cust_Reg_Body.phoneNumber,
      userId: user.id
    }

    const CustRegister = await this.customerService.customerRegistration(customerInfo);

    if (!CustRegister) {
      return 'failed to register customer';
    }

    const customer = await this.customerService.getNewCustomerDetailsByCustomerId(CustRegister.id);

    await this.queueService.emailJob([Cust_Reg_Body.email]);

    const payload = { id: customer.users.id, email: customer.users.email, role: customer.users.roles.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }


  async storeRegistration(store_reg_body) {
    const isEmailAlreadyUsed = this.userService.isEmailAlreadyInUse(store_reg_body.email);

    if (!isEmailAlreadyUsed) {
      return 'email is already used';
    }

    const hashedPassword = await bcrypt.hash(store_reg_body.password, 10);

    const user = await this.userService.registerStore({ ...store_reg_body, password: hashedPassword });

    if (!user) {
      return 'user not found';
    }

    const StoreInfo = {
      name: store_reg_body.name,
      address: store_reg_body.address,
      storeType: store_reg_body.storeType,
      isOpen: store_reg_body.isOpen,
      userId: user.id
    }

    const storeRegister = await this.storeService.storeRegistration(StoreInfo);

    if (!storeRegister) {
      return 'failed to register store';
    }

    const store = await this.storeService.getStoreDetailsByStoreId(storeRegister.id);
    console.log(JSON.stringify(store));
    const payload = { id: store.users.id, email: store.users.email, role: store.users.roles.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }


}

