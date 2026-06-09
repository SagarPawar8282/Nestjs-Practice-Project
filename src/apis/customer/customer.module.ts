import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepositoryProvider } from './customer.Repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[UsersModule],
  controllers: [CustomerController],
  providers: [CustomerService,CustomerRepositoryProvider],
  exports:[CustomerService]
})
export class CustomerModule {}
