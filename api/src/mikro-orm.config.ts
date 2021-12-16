export default {
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    dbName: 'gaston',
    user: 'gaston',
    password: 'gaston',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
};