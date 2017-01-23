'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
  id: 1,
  email: 'amy8@email.com',
  hashed_password: '$2a$12$4eZ3DS2Ww1s3A5q7ioQeteDOvvC6IXAYLh7CZrm4h6FjeeYcHF2va',
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
    }])
  })
    .then(function(){
     return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
   });
};
