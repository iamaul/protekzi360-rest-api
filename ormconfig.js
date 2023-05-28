import * as dotenv from 'dotenv';

dotenv.config();

const {
  DB_TYPE,
  INSTANCE_UNIX_SOCKET,
  MY_DB_USER,
  MY_DB_PASSWORD,
  MY_DATABASE,
} = process.env;

module.exports = {
  type: DB_TYPE,
  host: INSTANCE_UNIX_SOCKET,
  username: MY_DB_USER,
  password: MY_DB_PASSWORD,
  database: MY_DATABASE,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
};
