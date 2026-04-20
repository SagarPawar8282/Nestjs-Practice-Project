import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepositoryProvider } from './customer.Repository';

@Module({
  imports:[],
  controllers: [CustomerController],
  providers: [CustomerService,CustomerRepositoryProvider],
  exports:[CustomerService]
})
export class CustomerModule {}
