const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', (req, res) => {
  res.send('Post list');
});

router.post('/add', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    data: req.body.data ?? "",
    status: req.body.status ?? "new"
  });
  post.save().then(data => { res.status(200).json({ message: "success" }) }).catch(error => {
    res.status(500).json({ message: "failure" });
  })
});

module.exports = router;
