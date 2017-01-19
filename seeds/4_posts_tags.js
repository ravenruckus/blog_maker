
'use strict';

exports.seed = function(knex) {
  return knex('posts_tags').del()
    .then(() => {
      return knex('posts_tags').insert([{
  id: 1,
  post_id: 1,
  tag_id: 1,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },
  {
  id: 2,
  post_id: 2,
  tag_id: 1,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },
  {
  id: 3,
  post_id: 3,
  tag_id: 2,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 4,
  post_id: 2,
  tag_id: 2,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 5,
  post_id: 3,
  tag_id: 3,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 6,
  post_id: 3,
  tag_id: 4,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 7,
  post_id: 4,
  tag_id: 5,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 8,
  post_id: 4,
  tag_id: 6,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 9,
  post_id: 4,
  tag_id: 7,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 10,
  post_id: 5,
  tag_id: 8,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 11,
  post_id: 5,
  tag_id: 9,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 12,
  post_id: 6,
  tag_id: 10,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 13,
  post_id: 6,
  tag_id: 11,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 14,
  post_id: 5,
  tag_id: 12,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 15,
  post_id: 5,
  tag_id: 11,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },{
  id: 16,
  post_id: 3,
  tag_id: 10,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },
  {
  id: 17,
  post_id: 2,
  tag_id: 9,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  },
  {
  id: 18,
  post_id: 3,
  tag_id: 8,
  created_at: new Date('2016-06-06 14:26:16 UTC'),
  updated_at: new Date('2016-07-07 14:26:16 UTC')
  }])
})
    .then(function(){
     return knex.raw("SELECT setval('posts_tags_id_seq', (SELECT MAX(id) FROM posts_tags));");
   });
};
