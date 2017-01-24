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

router.get('/posts_tags', (req, res, next) => {
  knex('posts_tags')
  .then((rows) => {
    const posts_tags = camelizeKeys(rows);

    res.send(posts_tags);
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/posts_tags', authorize, (req, res, next) => {
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

      const insertPostTag = { postId, tagId };

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
});

module.exports = router;
