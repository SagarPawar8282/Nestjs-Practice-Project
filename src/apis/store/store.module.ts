import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepositoryProvider } from './store.repository';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[ProductModule,UsersModule],
  controllers: [StoreController],
  providers: [StoreService,StoreRepositoryProvider],
  exports:[StoreService]
})
export class StoreModule {}
