import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CanAuthGuard } from './core/auth/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { canContextService } from './core/auth/context/context.service';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AdvanceLoggingResponse } from './common/interceptors/advanceLoggingResponse.interceptor';
//import { ResponseInterceptor } from './common/interceptors/response.interceptor';
//import { LoggingResponse } from './common/interceptors/loggingReponse.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/v1');
  app.enableCors();

  app.useGlobalInterceptors(new AdvanceLoggingResponse());
  app.useGlobalGuards(new CanAuthGuard());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.use(helmet()); //Helmet is a middleware that secures Express/NestJS apps by setting HTTP headers like CSP, HSTS, and X-Frame-Options to protect against XSS, clickjacking, and other attacks.
  canContextService.init(app)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
