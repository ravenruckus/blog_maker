'use strict';
const boom = require('boom');
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
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

// .innerJoin('restaurants', 'dishes.restaurant_id', 'restaurants.id')
router.get('/posts_tags', (req, res, next) => {

  // const id = Number.parseInt(req.params.id);

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
    .innerJoin('posts_tags', 'posts_tags.post_id', 'posts.id' )
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



// router.get('/posts', (_req, res, next) => {
//   knex('posts')
//     .orderBy('created_at', 'desc')
//     .then((rows) => {
//       const posts = camelizeKeys(rows);
//
//       res.send(posts);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
//
// router.get('/posts/:id', (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//
//   if (Number.isNaN(id)) {
//     return next(0);
//   }
//
//   knex('posts')
//     .where('id', id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         throw boom.create(404, 'Not Found');
//       }
//
//       const post = camelizeKeys(row);
//
//       res.send(post);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
//
// router.post('/posts', authorize, (req, res, next) => {
//   const { title, userId, content, img } = req.body;
//
//   const insertPost = { title, userId, content, img };
//
//   knex('posts')
//     .insert(decamelizeKeys(insertPost), '*')
//     .then((rows) => {
//       const post = camelizeKeys(rows[0]);
//
//       res.send(post);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
//
// router.patch('/posts/:id', authorize, (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//
//   if (Number.isNaN(id)) {
//     return next();
//   }
//
//   knex('posts')
//     .where('id', id)
//     .first()
//     .then((post) => {
//       if (!post) {
//         throw boom.create(404, 'Not Found');
//       }
//
//       const { title, content, img } = req.body;
//       const updatePost = {};
//
//       if (title) {
//         updatePost.title = title;
//       }
//
//       if (content) {
//         updatePost.content = content;
//       }
//
//       if (img) {
//         updatePost.img = img;
//       }
//
//       return knex('posts')
//         .update(decamelizeKeys(updatePost), '*')
//         .where('id', id);
//     })
//     .then((rows) => {
//       const post = camelizeKeys(rows[0]);
//
//       res.send(post);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
//
// router.delete('/posts/:id', authorize, (req, res, next) => {
//   const id = Number.parseInt(req.params.id);
//
//   if (Number.isNaN(id)) {
//     return next();
//   }
//
//   knex('posts')
//     .del('*')
//     .where('id', id)
//     .then((posts) => {
//       const post = posts[0];
//
//       if (!post) {
//         return next();
//       }
//       delete post.id;
//       res.send(camelizeKeys(post));
//     })
//     .catch((err) => {
//       console.log(err);
//       next(err);
//     });
// });

module.exports = router;
