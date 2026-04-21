import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productRepositoryProvider } from './product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService,productRepositoryProvider],
  exports: [ProductService],
})
export class ProductModule {}
