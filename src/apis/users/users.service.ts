import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.repository';
import { Users } from './users.model';
import { CustomerService } from '../customer/customer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof Users,
    private customerService: CustomerService, private jwtService: JwtService) { }

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

  async registerCustomer(registrationInfo) {
    try {
      const role = 'Customer';
      const roleId = 2;
      const userRegister = await this.userRepository.create({
        email: registrationInfo.email,
        password: registrationInfo.password,
        roleId: roleId
      });

      if (!userRegister) {
        return 'unknow error'
      }
      const customerInfo = {
        name: registrationInfo.name,
        address: registrationInfo.address,
        phoneNumber: registrationInfo.phoneNumber,
        userId: userRegister.id
      }
      const CustRegister = await this.customerService.RegisterCustomer(customerInfo);

      if (!CustRegister) {
        return 'failed to register customer';
      }

      const customer = await this.customerService.getNewCustomerDetailsByCustomerId(CustRegister.id);
      return customer;
      

    } catch (err) {
      return err.message;
    }
  }

  async isCustomerExits(email: string) {
    const exit = await this.userRepository.findOne({ where: { email: email } });
    return exit != null ? exit : false;
  }

  async getCustomerDetails(id:number){
    const customer = await this.customerService.getCustomerDetailsByUserId(id);
    return customer;
  }
}
