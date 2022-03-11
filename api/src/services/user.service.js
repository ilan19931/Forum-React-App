const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

const User = require("../models/user.model");

const { generateJwt } = require("../utils/security");

// @route   POST api/users/login
// @desc    login to app
// @access   Private
async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "Wrong details." }] });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(400).send({ errors: [{ msg: "Wrong details." }] });
    }

    const user = await User.findById(foundUser._id).select("-password");

    // generate jwt
    const token = generateJwt(user);
    // send token to client
    res.send({ token });

    console.log(email + " has logged in");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

// @route   POST api/users/register
// @desc    create new user
// @access  Public
async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const foundEmail = await User.findOne({ email });
    if (foundEmail) {
      return res.status(400).send({ errors: [{ msg: "Email is taken." }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // save user into db
    await newUser.save();

    const user = await User.findById(newUser._id).select("-password");

    // generate jwt
    const token = await generateJwt(user);
    // send token to client
    res.send({ token });

    console.log(email + " has created new user.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}

module.exports = { login, register };
