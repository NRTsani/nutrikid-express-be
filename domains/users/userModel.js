const mongoose = require("mongoose");
require("dotenv").config();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("SECRET_KEY");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, default: null },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      required: true,
      default: "patient",
    },
    price: {
      chat: { type: Number, default: 25000 },
      call: { type: Number, default: 50000 },
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to database
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = cryptr.encrypt(user.password);
  }
  user.updatedAt = new Date();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
