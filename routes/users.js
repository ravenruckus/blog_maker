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
            console.log(err);
            next(err);
          });
        });





// router.post('/users', (req, res, next) => {
//   const { email, password } = req.body;
//
//   if (!email || !email.trim()) {
//     return next(boom.create(400, 'Email must not be blank'));
//   }
//
//   if (!password || password.length < 8) {
//     return next(boom.create(
//       400,
//       'Password must be at least 8 characters long'
//     ));
//   }
//
//   knex('users')
//     .where('email', email)
//     .first()
//     .then((user) => {
//       if (user) {
//         throw boom.create(400, 'Email already exists');
//       }
//
//       return bcrypt.hash(password, 12);
//     })
//     .then((hashedPassword) => {
//       const { firstName, lastName } = req.body;
//       const insertUser = { email, hashedPassword };
//
//       return knex('users').insert(decamelizeKeys(insertUser), '*');
//     })
//     .then((rows) => {
//       const user = camelizeKeys(rows[0]);
//       const claim = { userId: user.id };
//       const token = jwt.sign(claim, process.env.JWT_KEY, {
//         expiresIn: '30 days'
//       });
//
//       res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
//         secure: router.get('env') === 'production'
//       });
//
//       delete user.hashedPassword;
//
//       res.send(user);
//     })
//     .catch((err) => {
//       next(err);
//     });
//});

module.exports = router;
