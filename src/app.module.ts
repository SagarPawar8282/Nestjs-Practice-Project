import { Module } from '@nestjs/common';
import { CanDataSourceModule } from './core/datasource/datasource.module';
import { CoreModule } from './core/core.module';
import { ApisModules } from './apis/apis.module';
import { CommonModule } from './common/common.modules';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './apis/chat/chat.module';
import { WebSocketModule } from './webSocket/webSocket.module';
import { PresenceModule } from './apis/presence/presence.module';
import { ReportModule } from './apis/report/report.module';
import { SchedulesModule } from './apis/schedules/schedules.module';
import { MoniteringModule } from './redisAction/redisAction.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:`.env.${process.env.NODE_ENV}`
    }),
    CanDataSourceModule,
    CoreModule,
    ApisModules,
    WebSocketModule,
    CommonModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        retryStrategy(times) {
          return Math.min(times*50,2000)    
        },
        connectTimeout:10000            //failed fast if redis unavailable
      },
      prefix:'Queue'
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot(
      [{
        ttl: 60000,
        limit: 20,
      }]
    ),
    CacheModule.registerAsync({
      isGlobal: true,

      /*
      ttl:10 ,   //ttl is Cache auto expires after time small ttl --> frequelnty changing data , large ttl --> static data 
      store:redisStore,
      host:'localhost',
      port:6379,
      */
      useFactory: async () => {
        
        return {
          store: await redisStore({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            ttl: 10000,
          }),
        };
      },
    }),
    ChatModule,
    PresenceModule,
    ReportModule,
    SchedulesModule,
    MoniteringModule,
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
