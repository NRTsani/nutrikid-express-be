const express = require("express");
const router = express.Router();

const {
  createComment,
  updateComment,
  getComment,
  allComments,
  deleteComment,
} = require("./controller");

const {
  createCommentValidator,
  updateCommentValidator,
  getCommentValidator,
  deleteCommentValidator,
} = require("./validation");

const { requireSignIn, alowedTo } = require("../../../middlewares/authMiddlewares");

// @desc create comment
// @access protect
router.post(
  "/",
  requireSignIn,
  alowedTo("user", "admin", "doctor"),
  createCommentValidator,
  createComment
);

// @desc update comment
// @access protect
router.put(
  "/:id",
  requireSignIn,
  alowedTo("user", "admin", "doctor"),
  updateCommentValidator,
  updateComment
);

// @desc delete comment
// @access protect
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("user", "admin", "doctor"),
  deleteCommentValidator,
  deleteComment
);

// @desc get a single comment
router.get("/:id", getCommentValidator, getComment);

// @desc get all comment
router.get("/", allComments);

module.exports = router;
