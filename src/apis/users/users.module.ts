import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userRespositoryProvider } from './users.repository';

@Module({
  imports:[],
  controllers: [UsersController],
  providers: [UsersService,userRespositoryProvider],
  exports:[UsersService]
})
export class UsersModule {}
