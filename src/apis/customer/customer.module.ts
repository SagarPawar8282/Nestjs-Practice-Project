import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepositoryProvider } from './customer.Repository';
import { UsersModule } from '../users/users.module';
import { NestLoggingModule } from 'src/common/nestLogger/nestlogging.module';

@Module({
  imports:[UsersModule,NestLoggingModule],
  controllers: [CustomerController],
  providers: [CustomerService,CustomerRepositoryProvider],
  exports:[CustomerService]
})
export class CustomerModule {}
