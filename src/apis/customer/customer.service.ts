import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from './customer.Repository';
import { Customer } from './customer.model';
import { Users } from '../users/users.model';
import { Roles } from '../roles/roles.model';

@Injectable()
export class CustomerService {

  constructor(@Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer) { }

  async customerRegistration(customer: any): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update() {
    return `This action updates a # customer`;
  }

  async getNewCustomerDetailsByCustomerId(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
      include: [
        {
          model: Users,
          include: [Roles],
        },
      ],
    });

    return customer;
  }

  async getCustomerDetailsByUserId(id) {
    const customer = await this.customerRepository.findOne({
      where: { userId:id},
      include:[
        {
          model:Users,
          include:[Roles],
        }
      ]
    });
    return customer;
  }
}
