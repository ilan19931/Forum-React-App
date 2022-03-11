const express = require("express");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res
      .status(401)
      .send({ errors: [{ msg: "no token. authentication failed." }] });
  }

  const match = await jwt.verify(token, process.env.JWT_SECRET);
  if (!match) {
    return res
      .status(401)
      .send({ errors: [{ msg: "invalid token. authentication failed." }] });
  }

  const decode = await jwt.decode(token);
  req.user = decode.user;
  next();
}

module.exports = auth;
