import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CustomerModule } from '../customer/customer.module';
import { userRespositoryProvider } from './user.repository';

@Module({
  imports:[CustomerModule],
  controllers: [UsersController],
  providers: [UsersService,userRespositoryProvider],
  exports:[UsersService]
})
export class UsersModule {}
