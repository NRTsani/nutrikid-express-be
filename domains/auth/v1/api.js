const express = require("express");
const router = express.Router();

const { signup, login } = require("./controller");
const { signupValidator, loginValidator } = require("./validation");

// @desc Sign Up
router.post("/signup", signupValidator, signup);

// @desc Login
// router.get("/login", loginValidator, login);

// @desc Login
router.post("/login", loginValidator, login);

module.exports = router;
