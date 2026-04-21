import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CustomerModule } from '../customer/customer.module';
import { userRespositoryProvider } from './user.repository';
import { StoreModule } from '../store/store.module';

@Module({
  imports:[CustomerModule,StoreModule],
  controllers: [UsersController],
  providers: [UsersService,userRespositoryProvider],
  exports:[UsersService]
})
export class UsersModule {}
