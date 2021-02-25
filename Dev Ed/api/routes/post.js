const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', async (req, res) => {
  res.status(403).json({ message: "failure", details: "access denied", reqTime: Date.now() - start });
});

router.get('/:postID', async (req, res) => {
  let start = Date.now();
  try {
    const post = await Post.findById(req.params.postID, { _id: 0, __v: 0 });
    res.status(200).json({ post, reqTime: Date.now() - start });
  } catch(error) {
    res.status(404).json({ message: "failure", details: "post not found", reqTime: Date.now() - start });
  }
})

router.post('/add', async (req, res) => {
  let start = Date.now();
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    data: req.body.data ?? "",
    status: req.body.status ?? "new"
  });
  try {
    await post.save();
    res.status(200).json({ message: "success", reqTime: Date.now() - start });
  } catch(error) {
    res.status(500).json({ message: "failure", details: "saving failed", reqTime: Date.now() - start });
  }
});

module.exports = router;
