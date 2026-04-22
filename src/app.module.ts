import { Module } from '@nestjs/common';
import { CanDataSourceModule } from './core/datasource/datasource.module';
import { CoreModule } from './core/core.module';
import { ApisModules } from './apis/apis.module';
import { CommonModule } from './common/common.modules';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CanDataSourceModule,
    CoreModule,
    ApisModules,
    CommonModule,
    BullModule.forRoot({
      redis:{
        host:"localhost",
        port:6379
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
