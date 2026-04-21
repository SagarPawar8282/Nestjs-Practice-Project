import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepositoryProvider } from './store.repository';

@Module({
  imports:[],
  controllers: [StoreController],
  providers: [StoreService,StoreRepositoryProvider],
  exports:[StoreService]
})
export class StoreModule {}
