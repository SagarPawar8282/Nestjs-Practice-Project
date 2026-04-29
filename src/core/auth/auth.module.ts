import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/apis/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { QueueProcessorModule } from 'src/core/queue-processor/queue-processor.module';
import { StoreModule } from 'src/apis/store/store.module';
import { CustomerModule } from 'src/apis/customer/customer.module';

@Module({
  imports: [
    UsersModule,
    QueueProcessorModule,
    StoreModule,
    CustomerModule,
    JwtModule.register({
      global: true,
      secret:'abc',
      signOptions: { expiresIn: '6000s' },
    })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
