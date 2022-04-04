const express = require("express");
const jwt = require("jsonwebtoken");

async function adminAuth(req, res, next) {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res
      .status(401)
      .send({ errors: [{ msg: "no token. authentication failed." }] });
  }

  try {
    const match = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .send({ errors: [{ msg: "invalid token. authentication failed." }] });
  }

  const decode = await jwt.decode(token);

  if (!decode.user.isAdmin) {
    return res.status(401).send({
      errors: [{ msg: "Not admin. authentication failed." }],
    });
  }

  req.user = decode.user;
  next();
}

module.exports = adminAuth;
