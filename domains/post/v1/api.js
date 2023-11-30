const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  allPosts,
  getPost,
  deletePost,
} = require("./controller");

const {
  requireSignIn,
  alowedTo,
  isBlocked,
} = require("../../../middlewares/authMiddlewares");

const {
  createPostValidator,
  removePostValidator,
  updatePostValidator,
  getPostValidator,
} = require("./validation");

// @desc Create Post
// @access Protect
router.post(
  "/",
  requireSignIn,
  alowedTo("admin", "doctor", "user"),
  isBlocked,
  createPostValidator,
  createPost
);

// @desc Update Post
// @access Protect
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin", "doctor", "user"),
  updatePostValidator,
  updatePost
);

// @desc get all Post

router.get("/", 
// requireSignIn, 
// alowedTo("admin", "doctor", "user"),
allPosts);

// @desc get a single Post
// @access Protect
router.get(
  "/:id",
  // requireSignIn,
  // alowedTo("admin", "doctor", "user"),
  getPostValidator,
  getPost
);

// @desc Delete a Post
// @access Protect
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin", "doctor", "user"),
  removePostValidator,
  deletePost
);

module.exports = router;
