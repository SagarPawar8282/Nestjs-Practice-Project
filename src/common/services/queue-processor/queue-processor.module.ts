import { Module } from '@nestjs/common';
import { QueueProcessorService } from './queue-processor.service';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue-processor.processor';
import { ProductPersistenceModule } from 'src/apis/product-persistence/product-persistence.module';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'bulk-add-product'
      }
    ),
    ProductPersistenceModule  
  ],
  controllers: [],
  providers: [QueueProcessorService,QueueProcessor,],
  exports: [QueueProcessorService,BullModule]
})
export class QueueProcessorModule { }
