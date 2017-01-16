'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tags', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('tags');
};
