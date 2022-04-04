const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const adminAuth = require("../middleware/adminAuth");

const {
  getAllForums,
  getForumsByCategoryId,
  addForum,
  updateForum,
  deleteForum,
  getForumById,
} = require("../services/forum.service");

// @route   GET api/forums/
// @desc    get all forums
// @access  Public
router.get("/", async (req, res) => await getAllForums(req, res));

// @route   GET api/forums/forum_id
// @desc    get forum by id
// @access  Public
router.get("/:forum_id", async (req, res) => await getForumById(req, res));

// @route   GET api/forums/category/:category_id
// @desc    get forums by category id
// @access  Public
router.get(
  "/category/:category_id",
  async (req, res) => await getForumsByCategoryId(req, res)
);

// @route   POST api/forums/:category_id
// @desc    create new forum
// @access  Admin-Private
router.post(
  "/:category_id",
  [adminAuth, [check("name", "name is required").not().isEmpty()]],
  async (req, res) => await addForum(req, res)
);

// @route   PUT api/categories/:forum_id
// @desc    update forum
// @access  Admin-Private
router.put(
  "/:forum_id",
  [adminAuth, [check("name", "name is required").not().isEmpty()]],
  async (req, res) => await updateForum(req, res)
);

// @route   DELETE api/categories/:forum_id
// @desc    delete forum
// @access  Admin-Private
router.delete(
  "/:forum_id",
  [adminAuth],
  async (req, res) => await deleteForum(req, res)
);

module.exports = router;
