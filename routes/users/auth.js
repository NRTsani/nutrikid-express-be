const express = require("express");
const Cryptr = require("cryptr");
const User = require("../../domains/users/userModel");

const CryptrNew = new Cryptr("SECRET_KEY");
const router = express.Router();

router.get("/register", (req, res) => {
  res.send("register page");
});

router.get("/login", (req, res) => {
  res.send("login Page");
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const decryptedPassword = CryptrNew.decrypt(user.password);

    if (password !== decryptedPassword) {
      return res
        .status(401)
        .json({ message: "Email and password are incorrect" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
