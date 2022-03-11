const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const auth = require("../middleware/auth");

const { login, register } = require("../services/user.service");

// @route   GET api/user/auth
// @desc    test authentication
// @access  Private
router.get("/auth", [auth], (req, res) => {
  return res.send({ user: req.user });
});

// @route   POST api/user/login
// @desc    login to app
// @access  Public
router.post(
  "/login",
  [
    check("email", "email is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
  ],
  async (req, res) => await login(req, res)
);

// @route   POST api/user/register
// @desc    create new user
// @access  Public
router.post(
  "/register",
  [
    check("email", "email is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
  ],
  async (req, res) => await register(req, res)
);

module.exports = router;
