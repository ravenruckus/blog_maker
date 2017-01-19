'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, playload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload; // {userId; .. }

    next();
  });
};

// router.get('post_tags', (req, res, next) => {
//   knex('post_tags')
//     .innerJoin('posts', 'posts.id', 'post_tags.post_id')
//     .where('post_tags.tag_id', req.query.tagId)
//     .orderBy('posts.title')
//     .then((rows) {
//       const post_tags = camelizeKeys(rows);
//
//       res.send(post_tags);
//     })
//     .catch((err) => {
//       next(err);
//
//     });
// });

router.post('/posts_tags',  (req, res, next) => {
  const postId = Number.parseInt(req.body.postId);
  const tagId = Number.parseInt(req.body.tagId);

  if (!Number.isInteger(postId)) {
    return next(boom.create(400, 'Post ID must be an integer'));
  }

  if (!Number.isInteger(tagId)) {
    return next(boom.create(400, 'Tag ID must be an integer'));
  }

  knex('posts')
    .where('id', postId)
    .first()
    .then((post) => {
      if (!post) {
        throw boom.create(404, 'Post not found');
      }

      const insertPostTag = { postId, tagId }

    return knex('posts_tags')
      .insert(decamelizeKeys(insertPostTag), '*');
    })
    .then((rows) => {
      const postTag = camelizeKeys(rows[0]);

      res.send(postTag);
    })
    .catch((err) => {
      next(err);
    });



//   const { postId, tagId } = req.body;
//
//   const insertPostTag = { postId, tagId }
//
//   knex('post_tags')
//     .insert(decamelizeKeys(insertPostTag), '*')
//     .then((rows) => {
//       const post_tag = camelizeKeys(rows[0]);
//
//       res.send(post_tag);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });


// router.get('/tags/search', (req, res, next) => {
//   const ref = req.query.p;
//   knex('tags')
//     .innserJoin('post_tags', 'tag_id', 'tags.id')
//     .select('tags.name')
//     .where('post_tags.post_id', `posts.${ref}`);
//     .then((result) =>{
//       console.log(result);
//     })
//     .catch((err) => {
//       next(err);
//     });
    // .innerJoin('post_tags', 'post_id', 'posts.id')
    // .where('post_tags.tag_id', 'tags.id')
    // .then((rows) => {
    //   const tags = camelizeKeys(rows);
    //
    //   res.send(tags);
    // })
    // .catch((err) => {
    //   next(err);
    // });
});

module.exports = router;
