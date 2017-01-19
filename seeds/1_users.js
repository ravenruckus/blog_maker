'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
  id: 1,
  email: 'amy@email.com',
  hashed_password: '$2a$12$bY9b7sA0.SikKPtH3Xg4JeJyjLpIuoVJAfpniWxEtU7sKvZpUfQei',
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
    }])
  })
    .then(function(){
     return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
   });
};
