import { Module } from '@nestjs/common';
import { ProductDimensionsService } from './product-dimensions.service';
import { ProductDimensionsController } from './product-dimensions.controller';
import { ProductDeminsionRepositoryProvider } from './product-dimensions.repository';

@Module({
  imports:[],
  controllers: [ProductDimensionsController],
  providers: [ProductDimensionsService,ProductDeminsionRepositoryProvider],
  exports:[ProductDimensionsService]
})
export class ProductDimensionsModule {}
