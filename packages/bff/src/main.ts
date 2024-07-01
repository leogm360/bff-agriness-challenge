import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Config, ServerConfig } from '@agriness/domain/types';
import { AppModule } from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.create<INestApplication<ExpressAdapter>>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  const logger = new Logger('Bootstrap');

  const configService = app.get<ConfigService<Config>>(ConfigService);

  await app.listen(configService.get<ServerConfig>('server').port, async () => {
    if (configService.get<ServerConfig>('server').nodeEnv !== 'prod') {
      logger.debug(`Server is running on: ${await app.getUrl()}`);
    }
  });
}

bootstrap();
