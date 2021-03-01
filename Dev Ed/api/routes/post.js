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
});

router.delete('/:postID', async (req, res) => {
  let start = Date.now();
  try {
    const removedPost = await Post.remove({ _id: req.params.postID });
    res.status(200).json({ message: "success", details: "deletion complete", removedPost, reqTime: Date.now() - start });
  } catch(error) {
    res.status(404).json({ message: "failure", details: "deletion failed", reqTime: Date.now() - start });
  }
});

router.patch('/:postID', async (req, res) => {
  let start = Date.now();
  let update = {};
  if(req.body.title) {
    update.title = req.body.title;
  }
  if(req.body.description) {
    update.description = req.body.description;
  }
  if(req.body.data) {
    update.data = req.body.data;
  }
  update.status = "updated";
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.postID }, $set = update);
    res.status(200).json({ message: "success", updatedPost, reqTime: Date.now() - start });
  } catch (error) {
    res.status(500).json({ message: "failure", details: "update failed", reqTime: Date.now() - start });
  }
});

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
    res.status(200).json({ message: "success", post, reqTime: Date.now() - start });
  } catch(error) {
    res.status(500).json({ message: "failure", details: "saving failed", reqTime: Date.now() - start });
  }
});

module.exports = router;
