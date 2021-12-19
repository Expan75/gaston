import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableShutdownHooks(); // prevent lingering db connections https://github.com/mikro-orm/nestjs
  app.use(cookieParser());

  // swagger/OpenAPI
  if (configService.get('NODE_ENV') === 'development') {
    const swaggerPath = '/docs';
    const swaggerDocumentBuilder = new DocumentBuilder()
      .setTitle('Gaston API')
      .setDescription('Gaston API documentation.')
      .addBearerAuth()
      .addCookieAuth(configService.get('JWT_REFRESH_COOKIE_NAME'))
      .build();
    const swaggerDocument = SwaggerModule.createDocument(
      app,
      swaggerDocumentBuilder,
    );
    if (configService.get('OPENAPI_PASSWORD')) {
      app.use(
        swaggerPath,
        basicAuth({
          challenge: true,
          users: { swagger: configService.get('OPENAPI_PASSWORD') },
        }),
      );
      SwaggerModule.setup(swaggerPath, app, swaggerDocument, {
        customSiteTitle: 'Gaston OpenAPI Specification',
      });
    }
  }

  await app.listen(3000);
}
bootstrap();
