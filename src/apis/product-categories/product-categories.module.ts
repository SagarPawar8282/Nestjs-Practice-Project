import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoryRepositoryProvider } from './product-categories.repository';
import { QueryModule } from 'src/core/query/query.module';

@Module({
  imports:[QueryModule],
  controllers: [ProductCategoriesController,],
  providers: [ProductCategoriesService,ProductCategoryRepositoryProvider],
  exports:[ProductCategoriesService]
})
export class ProductCategoriesModule {}
