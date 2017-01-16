'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references(users.id).index();
    table.text('content').notNullable().defaultTo('');
    table.text('img').notNullable().defaultTo('');
    table.string('title').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
