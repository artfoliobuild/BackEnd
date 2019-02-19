const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const { isLoggedIn } = require('../middlewares/middleware');

router
  .get('/', isLoggedIn, (req, res) => {
    db('comments')
      .then(comments =>
        !comments.length
          ? res.status(404).json({
              message: 'There is no comment just yet, please try again later!'
            })
          : res.json(comments)
      )
      .catch(err => res.status(500).json(err));
  })
  .get('/:id', isLoggedIn, (req, res) => {
    const { id } = req.params;
    db('comments')
      .where('id', id)
      .then(comment =>
        comment
          ? res.json(comment)
          : res.status(404).json({
              message: 'There is no comment with the specified ID, try again!'
            })
      )
      .catch(err => res.status(500).json(err));
  })
  .post('/', isLoggedIn, (req, res) => {
    const comment = req.body;
    if (!comment.user_id || !comment.post_id) {
      res
        .status(400)
        .json({ error: 'user_id and post_id fields are required!' });
    }
    db('comments')
      .insert(comment)
      .then(ids => res.status(201).json(ids[0]))
      .catch(err => res.status(500).json(err));
  })
  .put('/:id', isLoggedIn, (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    db('comments')
      .where('id', id)
      .update(comment)
      .then(count =>
        !count
          ? res.status(404).json({
              message: 'There is no comment with the specified ID, try again!'
            })
          : res.json(count)
      )
      .catch(err => res.status(500).json(err));
  })
  .delete('/:id', isLoggedIn, (req, res) => {
    const { id } = req.body;
    db('comments')
      .where('id', id)
      .del()
      .then(count =>
        !count
          ? res.status(404).json({
              message: 'There is no comment with the specified ID, try again!'
            })
          : res.json(count)
      )
      .catch(err => res.status(500).json(err));
  });

module.exports = router;
