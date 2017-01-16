'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');


// eslint-disable-next-line new-cap

router.get('/posts', (_req, res, next) => {
  knex('posts')
    .orderBy('created_at', 'desc')
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

router.post('/posts', (req, res, next) => {
  const { title, userId, content, img } = req.body;

  const insertPost = { title, userId, content, img };

  knex('posts')
    .insert(decamelizeKeys(insertPost), '*')
    .then((rows) => {
      const post = camelizeKeys(rows[0]);

      res.send(post);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
