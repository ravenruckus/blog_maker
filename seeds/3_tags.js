'use strict';

exports.seed = function(knex) {
  return knex('tags').del()
    .then(() => {
      return knex('tags').insert([{
    id: 1,
    name: 'Caramel',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 2,
    name: 'Chocolate',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 3,
    name: 'Nougat',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 4,
    name: 'Vanilla',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 5,
    name: 'Coconut',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 6,
    name: 'Brownies',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },  {
    id: 7,
    name: 'Cake',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
    }])
  })
    .then(function(){
     return knex.raw("SELECT setval('tags_id_seq', (SELECT MAX(id) FROM tags));");
   });
};
