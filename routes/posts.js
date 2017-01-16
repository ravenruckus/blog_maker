'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');


// eslint-disable-next-line new-cap

router.get('/posts', (_req, res, next) => {
  knex('posts')
    .orderBy('title')
    .then((rows) => {
      const posts = camelizeKeys(rows);

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/posts/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next(0);
  }

  knex('posts')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const post = camelizeKeys(row);

      res.send(post);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
