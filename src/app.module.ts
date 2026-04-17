import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModules } from './apis/api.module';
@Module({
  imports: [ApiModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
