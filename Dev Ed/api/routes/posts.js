const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', async (req, res) => {
  let start = Date.now();
  try {
    const posts = await Post.find({}, { _id: 1, __v: 0 }).sort({ _id: -1});
    res.json({ posts, reqTime: Date.now() - start });
  } catch(error) {
    res.json({ message: "failure", details: "failed to fetch posts"});
  }
});

module.exports = router;
