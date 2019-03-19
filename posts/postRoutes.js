const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  db.insert(newPost)
    .then(newId => {
      db.findById(newId.id).then(post => {
        res.status(201).json(post);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
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
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const updatedInfo = { title, contents };
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  db.update(id, updatedInfo)
    .then(updatePost => {
      if (!id) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        db.findById(id).then(post => {
          res.status(201).json(post);
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    if (post) {
      db.remove(id).then(delId => {
        res.status(200).json(post);
      });
    } else {
      res
        .status(400)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  });
});

module.exports = router;
