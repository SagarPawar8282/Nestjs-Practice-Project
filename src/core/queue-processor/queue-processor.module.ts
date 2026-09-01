import { Module } from '@nestjs/common';
import { QueueProcessorService } from './queue-processor.service';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue-processor.processor';
import { ProductPersistenceModule } from 'src/apis/product-persistence/product-persistence.module';
import { EmailQueueProcessor } from './processor/email.processor';
import { NestLoggingContextService } from 'src/common/nestLogger/nestLogging-context.service';
import { NestLoggingModule } from 'src/common/nestLogger/nestlogging.module';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'bulk-add-product',
      },{
        name:'email-queue'
      }
    ),
    ProductPersistenceModule ,
    NestLoggingModule 
  ],
  controllers: [],
  providers: [QueueProcessorService,QueueProcessor,EmailQueueProcessor],
  exports: [QueueProcessorService,BullModule]
})
export class QueueProcessorModule { }
