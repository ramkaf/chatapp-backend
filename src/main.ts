import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger))
  const configService = app.get (ConfigService)
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
