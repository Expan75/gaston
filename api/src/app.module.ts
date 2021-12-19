import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        MIKRO_ORM_TYPE: Joi.string().default('postgresql'),
        MIKRO_ORM_ENTITIES: Joi.string().default('dist/**/*.entity.js'),
        MIKRO_ORM_ENTITIES_TS: Joi.string().default('src/**/*.entity.ts'),
        MIKRO_ORM_DB_HOST: Joi.string().default('localhost'),
        MIKRO_ORM_DB_PORT: Joi.number().default(5432),
        MIKRO_ORM_DB_USER: Joi.string().default('gaston'),
        MIKRO_ORM_DB_NAME: Joi.string().default('gaston'),
        MIKRO_ORM_DB_PASSWORD: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
