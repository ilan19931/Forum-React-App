const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/category.service");

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

// @route   GET api/categories/
// @desc    get all categories
// @access  Public
router.get("/", async (req, res) => await getAllCategories(req, res));

// @route   POST api/categories/
// @desc    create new category
// @access  Admin-Private
router.post(
  "/",
  [adminAuth, [check("name", "name is required").not().isEmpty()]],
  async (req, res) => await createCategory(req, res)
);

// @route   PUT api/categories/:category_id
// @desc    update category
// @access  Admin-Private
router.put(
  "/:category_id",
  [adminAuth, [check("name", "name is required").not().isEmpty()]],
  async (req, res) => await updateCategory(req, res)
);

// @route   DELETE api/categories/:category_id
// @desc    delete category
// @access  Admin-Private
router.delete(
  "/:category_id",
  [adminAuth],
  async (req, res) => await deleteCategory(req, res)
);

module.exports = router;
