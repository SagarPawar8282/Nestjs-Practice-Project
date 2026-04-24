import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepositoryProvider } from './store.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[ProductModule],
  controllers: [StoreController],
  providers: [StoreService,StoreRepositoryProvider],
  exports:[StoreService]
})
export class StoreModule {}
