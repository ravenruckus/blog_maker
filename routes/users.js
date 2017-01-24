'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
};

router.get('/users', (_req, res, next) => {
  knex('users')
    .then((rows) => {
      const users = camelizeKeys(rows);

      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/:id', authorize, (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next(0);
  }

  knex('users')
      .where('id', id)
      .first()
      .then((row) => {
        if (!row) {
          throw boom.create(404, 'Not Found');
        }

        const user = camelizeKeys(row);

        res.send(user);
      })
      .catch((err) => {
        next(err);
      });
});

router.post('/users', (req, res, next) => {
    bcrypt.hash(req.body.password, 12)
      .then((hashed_password) => {
        return knex('users').insert({
          email: req.body.email,
          hashed_password: hashed_password
        }, '*');
      })
        .then((users) => {
          const user = users[0];

          delete user.hashed_password;

          res.send(user);
        })
        .catch((err) => {
          next(err);
        });
      });

    router.delete('/users/:id', authorize, (req, res, next) => {
        const id = Number.parseInt(req.params.id);

        if(Number.isNaN(id)) {
          return next();
        }

        knex('users')
          .del('*')
          .where('id', id)
          .then((users) => {
            const user = users[0];

            if(!user) {
              return next();
            }
            delete user.id;
            res.send(camelizeKeys(user));
          })
          .catch((err) => {
            next(err);
          });
    });

module.exports = router;
