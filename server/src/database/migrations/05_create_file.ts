import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('files', table => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.string('name').notNullable();
    table.binary('data').notNullable();
    table
      .integer('accounts_id')
      .references('id')
      .inTable('accounts')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('files');
}
