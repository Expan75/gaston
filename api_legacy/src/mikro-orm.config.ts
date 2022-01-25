import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  type: 'postgresql',
  host: process.env.MIKRO_ORM_DB_HOST,
  port: Number(process.env.MIKRO_ORM_DB_PORT),
  user: process.env.MIKRO_ORM_DB_USER,
  password: process.env.MIKRO_ORM_DB_PASSWORD,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: { disableForeignKeys: false },
  debug: true ? process.env.NODE_ENV === 'development' : false,
  metadataProvider: TsMorphMetadataProvider,
};

export default config;
