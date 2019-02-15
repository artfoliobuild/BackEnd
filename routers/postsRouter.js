const express = require('express');
const router = express.Router();
const db = require('../dbConfig');

router
  .get('/', (req, res) => {
    db('posts')
      .then(posts =>
        !posts.length
          ? res.status(404).json({
              message: 'There is no post just yet, please try again later!'
            })
          : res.json(posts)
      )
      .catch(err => res.status(500).json(err));
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
      .where('id', id)
      .join('comments', 'id', 'post_id')
      .then(post => res.json(post))
      .catch(err => res.status(500).json(err));
  })
  .post('/', (req, res) => {
    const post = req.body;
    !post
      ? res
          .status(401)
          .json({ error: 'Check the submitted information and try again.' })
      : db('posts')
          .insert(post)
          .then(ids => res.json(ids[0]))
          .catch(er => res.status(500).json(err));
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
    db('posts')
      .where('id', id)
      .update(post)
      .then(count =>
        !count
          ? res
              .status(404)
              .json({ message: 'There is no post with the specified ID' })
          : res.json(count)
      )
      .catch(err => res.status(500).json(err));
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
      .where('id', id)
      .del()
      .then(count =>
        !count
          ? res
              .status(404)
              .json({ message: 'There is no post with the specified ID' })
          : res.status(201).json(count)
      )
      .catch(err => res.status(500).json(err));
  });

module.exports = router;
