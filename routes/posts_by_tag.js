'use strict';
const boom = require('boom');
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap

router.get('/posts_tags', (req, res, next) => {

  knex('posts')
    .innerJoin('posts_tags', 'posts_tags.post_id', 'posts.id' )
    .innerJoin('tags', 'tags.id', 'posts_tags.tag_id')
    .where('posts.id', 'posts_tags.post_id')
    .then((rows) => {
      if (!rows) {
        throw boom.create(404, 'Not Found');
      }

      const posts = camelizeKeys(rows);

      res.send(posts);
    })
        .catch((err) => {
          next(err);
        });
});

router.get('/posts_tags/:id', (req, res, next) => {

  const id = Number.parseInt(req.params.id);

  knex('posts')
    .innerJoin('posts_tags', 'posts_tags.post_id', 'posts.id')
    .innerJoin('tags', 'tags.id', 'posts_tags.tag_id')
    .where('tags.id', id)
    .then((rows) => {
      if (!rows) {
        throw boom.create(404, 'Not Found');
      }

      const posts = camelizeKeys(rows);

      res.send(posts);
    })
        .catch((err) => {
          next(err);
        });
});

module.exports = router;
