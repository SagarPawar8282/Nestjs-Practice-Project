import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CanAuthGuard } from './core/auth/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { canContextService } from './core/auth/context/context.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/v1');
  app.enableCors();

  app.useGlobalGuards(new CanAuthGuard());

  canContextService.init(app)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
