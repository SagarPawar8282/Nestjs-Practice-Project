import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CanAuthGuard } from './core/auth/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { canContextService } from './core/auth/context/context.service';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AdvanceLoggingResponse } from './common/interceptors/advanceLoggingResponse.interceptor';
import { loggerMiddlewares } from './common/middleware/logger.middleware';
//import { ResponseInterceptor } from './common/interceptors/response.interceptor';
//import { LoggingResponse } from './common/interceptors/loggingReponse.interceptor';

import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/v1');
  app.enableCors();

  app.use(loggerMiddlewares);

  app.useGlobalInterceptors(new AdvanceLoggingResponse());
  app.useGlobalGuards(new CanAuthGuard());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true
    })
  );


  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues',);

  //app.use('/admin/queue',serverAdapter.getRouter());
  //bull board for queue tracking
  const queue = app.get<Queue>(getQueueToken('bulk-add-product'));

  createBullBoard({
    queues: [new BullAdapter(queue)],
    serverAdapter
  });
  app
    .getHttpAdapter()
    .getInstance()
    .use('/admin/queues', serverAdapter.getRouter());

  app.use(helmet()); //Helmet is a middleware that secures Express/NestJS apps by setting HTTP headers like CSP, HSTS, and X-Frame-Options to protect against XSS, clickjacking, and other attacks.
  canContextService.init(app)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
