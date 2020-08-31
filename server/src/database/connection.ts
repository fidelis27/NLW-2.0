import knex from 'knex';

const config = require('../../knexfile');

/* const connection = knex(config.developmentSqlite); */
const connection = knex(config.development);

export default connection;
