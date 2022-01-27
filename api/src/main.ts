import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // forbid any input to the API not accepted by DTO:s
  // app.useGlobalPipes(
  //  new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  //  );
  app.use(cookieParser());
  
  await app.listen(configService.get('PORT'));
}
bootstrap();