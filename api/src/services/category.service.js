const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

const Category = require("../models/category.model");

// @route   GET api/categories/
// @desc    get all categories
// @access  Public
async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();

    res.send({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

// @route   POST api/categories/
// @desc    create new category
// @access  Admin-Private
async function createCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    const foundCategory = await Category.findOne({ name });
    if (foundCategory) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Category name is taken" }] });
    }

    const newCategory = new Category({
      name,
    });

    await newCategory.save();

    res.send(newCategory);

    console.log(name + "category created.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

// @route   PUT api/categories/:category_id
// @desc    update category
// @access  Admin-Private
async function updateCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const categoryId = req.params.category_id;

  if (!mongoose.isValidObjectId(categoryId)) {
    return res.status(400).send({ errors: [{ msg: "invalid category id" }] });
  }

  const { name } = req.body;

  try {
    const foundCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: { name } }
    );

    if (!foundCategory) {
      return res.status(400).send({ errors: [{ msg: "invalid Category." }] });
    }

    foundCategory.name = name;

    res.send(foundCategory);

    console.log(name + "category updated.");
  } catch (err) {
    return res.status(500).send("Server Error");
  }
}

// @route   DELETE api/categories/:category_id
// @desc    delete category
// @access  Admin-Private
async function deleteCategory(req, res) {
  const categoryId = req.params.category_id;

  if (!mongoose.isValidObjectId(categoryId)) {
    return res.status(400).send({ errors: [{ msg: "invalid Category." }] });
  }

  try {
    const deletedCategory = await Category.findOneAndDelete({
      _id: categoryId,
    });

    if (!deletedCategory) {
      return res.status(400).send({ errors: [{ msg: "wrong category id" }] });
    }

    res.send({ msg: "category deleted." });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
