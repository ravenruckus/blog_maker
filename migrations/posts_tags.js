'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('posts_tags', (table) => {
    table.increments();
    table.integer('post_id')
      .notNullable()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .index();
    table.integer('tag_id')
    .notNullable()
    .references('id')
    .inTable('tags')
    .onDelete('CASCADE')
    .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts_tags');
};
