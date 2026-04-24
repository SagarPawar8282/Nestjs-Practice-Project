import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/apis/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { QueueProcessorModule } from 'src/common/services/queue-processor/queue-processor.module';

@Module({
  imports: [
    UsersModule,QueueProcessorModule,
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
