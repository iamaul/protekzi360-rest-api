import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    logging: true,
    host: process.env.INSTANCE_UNIX_SOCKET,
    username: process.env.MY_DB_USER,
    password: process.env.MY_DB_PASSWORD,
    database: process.env.MY_DATABASE,
    autoLoadEntities: true,
    synchronize: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
});
