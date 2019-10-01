const express = require('express');
const postDB = require('../data/db');
const router = express.Router();


router.get('/', (req,res) => {
  res.send("Hello from the /posts route");
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
module.exports = router;