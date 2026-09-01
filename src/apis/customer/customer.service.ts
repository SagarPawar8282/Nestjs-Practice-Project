import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from './customer.Repository';
import { Customer } from './customer.model';
import { Users } from '../users/users.model';
import { Roles } from '../roles/roles.model';
import { StoreService } from '../store/store.service';
import { NestLoggingService } from 'src/common/nestLogger/nestLogging.service';
import { NestLoggingContextService } from 'src/common/nestLogger/nestLogging-context.service';

@Injectable()
export class CustomerService {

  constructor(
    @Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer,
    private readonly nestLoggingService: NestLoggingService,
    private readonly nestLoggingContextService: NestLoggingContextService
  ) { }

  async customerRegistration(customer: any): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  async findAll() {
    this.nestLoggingService.log(
      {
        event: 'find_all_customer', service: 'CustomerService', correlationId: this.nestLoggingContextService.getCorrelationId(), requestId: 'demo-customer-101', method: 'findAll',
        user: {
          email: 'user@example.com',
          PaSSwoRd: 'secret123',
          OTP: '123'
        },
      });
    this.nestLoggingService.error(
      { event: 'find_all_customer', service: 'CustomerService', correlationId: this.nestLoggingContextService.getCorrelationId(), requestId: 'demo-customer-101', method: 'findAll' });
    this.nestLoggingService.warn(
      { event: 'find_all_customer', service: 'CustomerService', correlationId: this.nestLoggingContextService.getCorrelationId(), requestId: 'demo-customer-101', method: 'findAll' });
    this.nestLoggingService.debug(
      { event: 'find_all_customer', service: 'CustomerService', correlationId: this.nestLoggingContextService.getCorrelationId(), requestId: 'demo-customer-101', method: 'findAll' })
    return await this.customerRepository.findAll();
  }

  async findOne(id: number) {
    return await this.customerRepository.findOne({ where: { userId: id } })
  }

  async update() {
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
      where: { userId: id },
      include: [
        {
          model: Users,
          include: [Roles],
        }
      ]
    });
    return customer;
  }

}
