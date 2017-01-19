'use strict';

exports.seed = function(knex) {
  return knex('tags').del()
    .then(() => {
      return knex('tags').insert([{
    id: 1,
    name: 'Strawberry',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 2,
    name: 'Valentine\'s Day',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 3,
    name: 'Macaroons',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 4,
    name: 'Luxury Cookies',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 5,
    name: 'Sprinkles!',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  }, {
    id: 6,
    name: 'Cupcakes',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },  {
    id: 7,
    name: 'Chocolate Frosting',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },
  {
    id: 8,
    name: 'Mousse',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },{
    id: 9,
    name: 'Strawbe',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },{
    id: 10,
    name: 'Peppermint',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },{
    id: 11,
    name: 'Cookies',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },{
    id: 12,
    name: 'Fudge',
    created_at: new Date('2016-01-12 14:26:16 UTC'),
    updated_at: new Date('2016-01-12 14:26:16 UTC')
  },])
  })
    .then(function(){
     return knex.raw("SELECT setval('tags_id_seq', (SELECT MAX(id) FROM tags));");
   });
};
