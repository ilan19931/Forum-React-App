const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

const Category = require("../models/category.model");
const Forum = require("../models/forum.model");

// @route   GET api/forums/
// @desc    get all forums by category id
// @access  Public
async function getForumsByCategoryId(req, res) {
  const categoryId = req.params.category_id;
  if (!mongoose.isValidObjectId(categoryId)) {
    return res.status(400).send({ errors: [{ msg: "invalid category id." }] });
  }

  try {
    const forums = await Forum.find({ categoryId });

    res.send(forums);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
}

// @route   POST api/forums/:category_id
// @desc    create new forum
// @access  Public
async function addForum(req, res) {
  const categoryId = req.params.category_id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  //check if the id is valid objectId
  if (!mongoose.isValidObjectId(categoryId)) {
    return res.status(400).send({ errors: [{ msg: "invalid category id." }] });
  }

  try {
    const foundCategory = await Category.findOne({ _id: categoryId });
    if (!foundCategory) {
      return res
        .status(400)
        .send({ errors: [{ msg: "invalid category id." }] });
    }

    const { name, description } = req.body;

    const newForum = new Forum({
      categoryId,
      name,
      description,
    });

    await newForum.save();

    res.send(newForum);

    console.log(name + " forum created.");
  } catch (err) {
    return res.status(500).send("Server Error");
  }
}

// @route   PUT api/forums/:forum_id
// @desc    update forum
// @access  Admin-Private
async function updateForum(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const forumId = req.params.forum_id;

  if (!mongoose.isValidObjectId(forumId)) {
    return res.status(400).send({ errors: [{ msg: "invalid category id" }] });
  }

  const { name } = req.body;

  try {
    const foundForum = await Forum.findOneAndUpdate(
      { _id: forumId },
      { $set: { name } }
    );

    if (!foundForum) {
      return res.status(400).send({ errors: [{ msg: "invalid Forum id." }] });
    }

    foundForum.name = name;

    res.send(foundForum);

    console.log(name + "forum updated.");
  } catch (err) {
    return res.status(500).send("Server Error");
  }
}

// @route   DELETE api/categories/:category_id
// @desc    delete category
// @access  Admin-Private
async function deleteForum(req, res) {
  const forumId = req.params.forum_id;

  if (!mongoose.isValidObjectId(forumId)) {
    return res.status(400).send({ errors: [{ msg: "invalid forum id." }] });
  }

  try {
    const deletedForum = await Forum.findOneAndDelete({
      _id: forumId,
    });

    if (!deletedForum) {
      return res.status(400).send({ errors: [{ msg: "wrong forum id" }] });
    }

    res.send({ msg: "forum deleted." });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

module.exports = { getForumsByCategoryId, addForum, updateForum, deleteForum };
