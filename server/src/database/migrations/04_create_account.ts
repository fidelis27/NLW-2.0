import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('accounts', table => {
    table.increments('id').primary();
    table.string('name').notNullable;
    table.string('email').notNullable;
    table.string('password_hash').notNullable;
    table.string('avatar').notNullable;
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('accounts');
}
