const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; // Gantilah dengan rahasia yang kuat
const expiresIn = "1h";

// Fungsi untuk membuat token JWT
exports.generateToken = (user) => {
  return jwt.sign({ userId: user._id, username: user.username }, secret, {
    expiresIn,
  });
};
