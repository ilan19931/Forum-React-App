const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const auth = require("../middleware/auth");

const {
  getPostsByForumId,
  addPost,
  updatePost,
  deletePost,
} = require("../services/post.service");

// @route   GET api/posts/:forum_id
// @desc    get all posts by forum id
// @access  Public
router.get("/:forum_id", async (req, res) => await getPostsByForumId(req, res));

// @route   POST api/posts/:forum_id
// @desc    create new post
// @access  Private
router.post(
  "/:forum_id",
  [auth, [check("body", "body is required").not().isEmpty()]],
  async (req, res) => await addPost(req, res)
);

// @route   PUT api/posts/:post_id
// @desc    update post
// @access  Admin-Private
router.put(
  "/:post_id",
  [auth, [check("body", "body is required").not().isEmpty()]],
  async (req, res) => await updatePost(req, res)
);

// @route   DELETE api/posts/:post_id
// @desc    delete post
// @access  Admin-Private
router.delete(
  "/:post_id",
  [auth],
  async (req, res) => await deletePost(req, res)
);

module.exports = router;
