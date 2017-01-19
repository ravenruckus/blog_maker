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



router.post('/posts', authorize, (req, res, next) => {

  let tagIdsArr;
  let post;
  
  const { title, userId, content, img, tagIds } = req.body;

  tagIdsArr = req.body.tagIds;

  const insertPost = { title, userId, content, img };


  knex('posts')
    .insert(decamelizeKeys(insertPost), '*')
    .then((rows) => {
      console.log(tagIdsArr)
      post = camelizeKeys(rows[0]);

      const insertPostTag = [];

      if(tagIdsArr.length != 0) {
        for(const element in tagIdsArr) {
          insertPostTag.push({ tagId: tagIdsArr[element], postId: post.id });
        }

        return knex('posts_tags')
          .insert(decamelizeKeys(insertPostTag), '*');
      }
      else {
        res.send(post);
      }
    })
    .then(() => {
      res.send(post);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/posts/:id', authorize, (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('posts')
    .where('id', id)
    .first()
    .then((post) => {
      if (!post) {
        throw boom.create(404, 'Not Found');
      }

      const { title, content, img } = req.body;
      const updatePost = {};

      if (title) {
        updatePost.title = title;
      }

      if (content) {
        updatePost.content = content;
      }

      if (img) {
        updatePost.img = img;
      }

      return knex('posts')
        .update(decamelizeKeys(updatePost), '*')
        .where('id', id);
    })
    .then((rows) => {
      const post = camelizeKeys(rows[0]);

      res.send(post);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/posts/:id', authorize, (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('posts')
    .del('*')
    .where('id', id)
    .then((posts) => {
      const post = posts[0];

      if (!post) {
        return next();
      }
      delete post.id;
      res.send(camelizeKeys(post));
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
