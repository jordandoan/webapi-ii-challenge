const express = require('express');
const postDB = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  postDB.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({error: "The posts information could not be retrieved."}));
});

router.post('/', (req,res) => {
  const post =  req.body;
  if (!post.title || !post.content) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    postDB.insert(post)
      .then(id => res.status(201).json({...post, ...id}))
      .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
  }
});

router.post('/:id/comments', (req,res) => {
  const id = req.params.id;
  const comment = req.body;
  postDB.findById(id)
    .then(foundPost => {
      if (!foundPost) {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else if (!comment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
      } else {
        postDB.insertComment(comment)
          .then(commentID => res.status(201).json({...commentID, ...comment}))
          .catch(err => res.status(500).json({ error: "There was an error while saving the comment to the database"}));
      }
    });
});

router.get('/:id', (req,res) => {
  const id = req.params.id;
  postDB.findById(id)
    .then(foundPost => {
      if (!foundPost) {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else {
        res.status(200).json(foundPost);
      }
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }));
});

router.get('/:id/comments', (req,res) => {
  const id = req.params.id;
  postDB.findById(id)
    .then(foundPost => {
      if (!foundPost) {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else {
        postDB.findPostComments(id)
          .then(comments => res.status(200).json(comments))
          .catch(err => res.status(500).json({ error: "The comments information could not be retrieved."}));
      }
    });
})

router.delete('/:id', (req,res) => {
  const id = req.params.id;
  postDB.findById(id)
    .then(foundPost => {
      if (!foundPost) {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else {
        postDB.remove(id)
          .then(success => res.status(201).json({message: "Successfully deleted"}))
          .catch(err => res.status(500).json({ error: "The post could not be removed."}));
      }
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const post =  req.body;
  postDB.findById(id)
    .then(foundPost => {
      if (!foundPost) {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      } else if (!post.title || !post.content) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
      } else {
        postDB.update(id, post)
          .then(updatedRecords => res.status(200).json({...post, ...id}))
          .catch(err => res.status(500).json({ error: "The post information could not be modified." }));
      }
    })
});

module.exports = router;