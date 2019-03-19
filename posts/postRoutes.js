const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      return res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.id) {
        res.status(200).json(post);
      } else {
        return res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      return res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('ID', id);
  db.findById(id).then(post => {
    if (post.id) {
      db.remove(id).then(delId => {
        res.status(200).json(post);
      });
    } else {
      return res
        .status(400)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  });
});

module.exports = router;
