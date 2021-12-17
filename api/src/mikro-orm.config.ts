/* configuration for mikro-orm cli */
import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { Restaurant, User } from './users/entities/user.entity';

// relies on automagic env vars (see app.module)
const logger = new Logger('MikroORM');
logger.debug('path: ', __dirname + '/**/*.entity.{ts,js}')
const config = {
    entities: [__dirname + '/**/*.entity.js'],
    entitiesTs: [__dirname + '/**/*.entity.ts,js}'],
    debug: true,
    logger: logger.log.bind(logger),
} as Options;
export default config;
