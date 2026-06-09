import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepositoryProvider } from './store.repository';
import { UsersModule } from '../users/users.module';
import { QueryModule } from 'src/core/query/query.module';

@Module({
  imports:[UsersModule,QueryModule],
  controllers: [StoreController],
  providers: [StoreService,StoreRepositoryProvider],
  exports:[StoreService]
})
export class StoreModule {}
