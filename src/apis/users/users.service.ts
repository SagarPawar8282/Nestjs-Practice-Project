import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.repository';
import { Users } from './users.model';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from '../store/store.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof Users,
    private customerService: CustomerService, private storeService:StoreService,
    private jwtService: JwtService) { }

  create(createUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update() {
    return `This action updates a # user`;
  }

  async isEmailAlreadyInUse(email: string): Promise<Boolean> {
    const emailExits = await this.userRepository.findOne({ where: { email: email } });
    return emailExits != null ? true : false;
  }

  async isEmailExits(email: string) {
    const exit = await this.userRepository.findOne({ where: { email: email } });
    return exit != null ? exit : false;
  }

  async createUser(userInfo, roleId:number) {
    const user = await this.userRepository.create({
      email: userInfo.email,
      password: userInfo.password,
      roleId: roleId
    });

    return user;
  }

  async registerCustomer(registrationInfo) {
    try {
      const roleId = 2;
      const userInfo = { email: registrationInfo.email, password: registrationInfo.password };
      const userRegister = await this.createUser(userInfo, roleId)
      // const userRegister = await this.userRepository.create({
      //   email: registrationInfo.email,
      //   password: registrationInfo.password,
      //   roleId: roleId
      // });

      if (!userRegister) {
        return 'unknow error'
      }
      const customerInfo = {
        name: registrationInfo.name,
        address: registrationInfo.address,
        phoneNumber: registrationInfo.phoneNumber,
        userId: userRegister.id
      }
      const CustRegister = await this.customerService.customerRegistration(customerInfo);

      if (!CustRegister) {
        return 'failed to register customer';
      }

      const customer = await this.customerService.getNewCustomerDetailsByCustomerId(CustRegister.id);
      return customer;


    } catch (err) {
      return err.message;
    }
  }

  

  async registerStore(registrationInfo) {
    try {
      const roleId = 3;
      const userInfo = {email:registrationInfo.email, password:registrationInfo.password}
      const userRegister = await this.createUser(userInfo,roleId) ;

      if(!userRegister){
        return 'unknown error '
      }

      const StoreInfo = {
        name:registrationInfo.name,
        address: registrationInfo.address,
        storeType:registrationInfo.storeType,
        isOpen:registrationInfo.isOpen,
        userId:userRegister.id
      }

      const storeRegister = await this.storeService.storeRegistration(StoreInfo);

      if(!storeRegister){
        return 'failed to register store';
      }

      const store= await this.storeService.getStoreDetailsByStoreId(storeRegister.id);
      return store;
       
    } catch (error) {
      return error.message
    }
  }

  async login(loginBody){
    const isRegisterUser = await this.isEmailExits(loginBody.email);

    if(!isRegisterUser){
      return 'user with email is not register';
    }

    const match = await bcrypt.compare(loginBody.password,isRegisterUser.password);
    
    if(!match){
      return 'incorrect password';
    }

    let user;
    if(isRegisterUser.roleId === 2){
      user = await this.customerService.getCustomerDetailsByUserId(isRegisterUser.id);
    }
    else if(isRegisterUser.roleId === 3){
      user = await this.storeService.getStoreDetailsByUserId(isRegisterUser.id);
    }else {
      return null;
    }
    return user;
  }
}
