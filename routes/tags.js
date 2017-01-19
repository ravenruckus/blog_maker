'use strict';
const boom = require('boom');
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken')
const { camelizeKeys, decamelizeKeys } = require('humps');


// eslint-disable-next-line new-cap

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
};

router.get('/tags', (_req, res, next) => {
  knex('tags')
    .orderBy('created_at', 'desc')
    .then((rows) => {
      const tags = camelizeKeys(rows);

      res.send(tags);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/tags/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next(0);
  }

  knex('tags')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const tag = camelizeKeys(row);

      res.send(tag);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/tags', authorize, (req, res, next) => {
  const { name, id } = req.body;

  const insertTag = { name, id};

  knex('tags')
    .insert(decamelizeKeys(insertTag), '*')
    .then((rows) => {
      const tag = camelizeKeys(rows[0]);

      res.send(tag);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/tags/:id', authorize, (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('tags')
    .del('*')
    .where('id', id)
    .then((tags) => {
      const tag = tags[0];

      if (!tag) {
        return next();
      }
      delete tag.id;
      res.send(camelizeKeys(tag));
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});



module.exports = router;
