const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

const Forum = require("../models/forum.model");
const Post = require("../models/post.model");

// @route   GET api/posts/byId/:post_id
// @desc    get post by post id
// @access  Public
async function getPostById(req, res) {
  const postId = req.params.post_id;

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).send({ errors: [{ msg: "invalid post id." }] });
  }

  try {
    const post = await Post.findById(postId);

    res.send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

// @route   GET api/posts/:forum_id
// @desc    get all posts by forum id
// @access  Public
async function getPostsByForumId(req, res) {
  const forumId = req.params.forum_id;

  if (!mongoose.isValidObjectId(forumId)) {
    return res.status(400).send({ errors: [{ msg: "invalid forum id." }] });
  }

  try {
    const posts = await Post.find({ forumId });

    res.send(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

// @route   POST api/posts/:forum_id
// @desc    create new post
// @access  Private
async function addPost(req, res) {
  const forumId = req.params.forum_id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  //check if the id is valid objectId
  if (!mongoose.isValidObjectId(forumId)) {
    return res.status(400).send({ errors: [{ msg: "invalid forum id." }] });
  }

  try {
    const foundForum = await Forum.findOne({ _id: forumId });
    if (!foundForum) {
      return res.status(400).send({ errors: [{ msg: "invalid forum id." }] });
    }

    const { title, body } = req.body;

    const newPost = new Post({
      forumId,
      userId: req.user._id,
      title,
      body,
    });

    await newPost.save();

    res.send(newPost);

    console.log(req.user.email + " posted new post.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

// @route   PUT api/posts/:post_id
// @desc    update post
// @access  Private
async function updatePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const postId = req.params.post_id;

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).send({ errors: [{ msg: "invalid post id" }] });
  }

  const { body } = req.body;

  try {
    let foundPost = null;

    // check if admin
    if (req.user.isAdmin) {
      foundPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { body } }
      );
    } else {
      foundPost = await Post.findOneAndUpdate(
        { _id: postId, userId: req.user._id },
        { $set: { body } }
      );
    }

    if (!foundPost) {
      return res.status(400).send({ errors: [{ msg: "invalid post id." }] });
    } else {
    }

    foundPost.body = body;

    res.send(foundPost);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
}

// @route   DELETE api/posts/:post_id
// @desc    delete post
// @access  Private
async function deletePost(req, res) {
  const postId = req.params.post_id;

  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).send({ errors: [{ msg: "invalid post id." }] });
  }

  try {
    let deletedPost = null;

    //check if admin user
    if (req.user.isAdmin) {
      deletedPost = await Post.findOneAndDelete({
        _id: postId,
      });
    } else {
      deletedPost = await Post.findOneAndDelete({
        _id: postId,
        userId: req.user._id,
      });
    }

    if (!deletedPost) {
      return res.status(400).send({ errors: [{ msg: "wrong post id" }] });
    }

    res.send({ msg: "post deleted." });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

module.exports = {
  getPostById,
  getPostsByForumId,
  addPost,
  updatePost,
  deletePost,
};
