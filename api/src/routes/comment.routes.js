const router = require("express").Router();

const { check } = require("express-validator");

const auth = require("../middleware/auth");
const {
  addNewComment,
  getAllComments,
  likeComment,
} = require("../services/comment.services");

// @route   GET api/posts/comments/:post_id
// @desc    get all comments for a post by post id
// @access  Public
router.get("/:post_id", async (req, res) => await getAllComments(req, res));

// @route   POST api/posts/comments/:post_id
// @desc    create comment in post by post id
// @access  Private
router.post(
  "/:post_id",
  [auth, [check("body", "body is required").not().isEmpty()]],
  async (req, res) => await addNewComment(req, res)
);

// @route   PUT api/posts/comments/likes/:comment_id
// @desc    like a comment
// @access  Private
router.put(
  "/likes/:comment_id",
  [auth],
  async (req, res) => await likeComment(req, res)
);

module.exports = router;
