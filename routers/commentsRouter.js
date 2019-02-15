const express = require('express');
const router = express.Router();
const db = require('../dbConfig');

router.get('/', (req, res) => {
  db('comments')
    .then(comments =>
      !comments.length
        ? res.status(404).json({
            message: 'There is no comment just yet, please try again later!'
          })
        : res.json(comments)
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
