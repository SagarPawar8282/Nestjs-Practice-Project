import { Module } from '@nestjs/common';
import { CanDataSourceModule } from './core/datasource/datasource.module';
import { CoreModule } from './core/core.module';
import { ApisModules } from './apis/apis.module';
import { CommonModule } from './common/common.modules';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CanDataSourceModule,
    CoreModule,
    ApisModules,
    CommonModule,
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379
      }
    }),
    ScheduleModule.forRoot({}),
    ThrottlerModule.forRoot(
      [{
        ttl: 30000,
        limit: 20,
      }]
    ),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
