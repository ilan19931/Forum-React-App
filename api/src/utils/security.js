const jwt = require("jsonwebtoken");

function generateJwt(user) {
  return jwt.sign(
    {
      user,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = { generateJwt };
