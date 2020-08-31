import { resolve } from 'path';

module.exports = {
  development: {
    // conexão local usando docker
    client: 'postgres',
    protocol: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'thiago27',
      database: 'proffy',
    },

    migrations: {
      tableName: 'migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
  },
  developmentSqlite: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
      tableName: 'migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'postgres',
    protocol: 'postgres',
    connection: {
      host: process.env.Host,
      port: process.env.DB_Port,
      user: process.env.User,
      password: process.env.Password,
      database: process.env.Database,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: 'migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
  },
};
