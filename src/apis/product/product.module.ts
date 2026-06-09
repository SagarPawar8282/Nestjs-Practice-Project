import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
//import { productRepositoryProvider } from './product.repository';
import { QueueProcessorModule } from 'src/core/queue-processor/queue-processor.module';
import { ProductPersistenceModule } from '../product-persistence/product-persistence.module';
import { QueryModule } from 'src/core/query/query.module';
import { StoreModule } from '../store/store.module';
import { ProductCategoriesModule } from '../product-categories/product-categories.module';

@Module({
  imports:[QueueProcessorModule,ProductPersistenceModule,QueryModule,StoreModule,ProductCategoriesModule],
  controllers: [ProductController],
  providers: [ProductService,/*productRepositoryProvider*/],
  exports: [ProductService],
})
export class ProductModule {}
