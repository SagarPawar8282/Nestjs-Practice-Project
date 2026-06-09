import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartRepositoryProvider } from './cart.repository';
import { ProductPersistenceModule } from '../product-persistence/product-persistence.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports:[ProductPersistenceModule,CustomerModule],
  controllers: [CartController],
  providers: [CartService,cartRepositoryProvider],
})
export class CartModule {}
