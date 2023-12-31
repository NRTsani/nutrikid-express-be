const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  updateUser,
  allUsers,
  getAllDoctor,
  getUser,
  deleteUser,
  profilePhotoUpload,
  uploadProfileImage,
  whoViewMyProfile,
  following,
  Unfollowing,
  block,
  unblock,
  block_admin,
  unblockUser_admin,
  changeUserPassword,
  deleteAccount,
} = require("./controller");

const {
  createUserValidator,
  loginValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
  getAllUserValidator,
  whoViewMyProfileValidator,
  followValidator,
  changeUserPasswordValidator,
} = require("./validation");

const {
  requireSignIn,
  alowedTo,
} = require("../../../middlewares/authMiddlewares");

// @Desc Create a User
// @access Private/Admin
router.post(
  "/",
  requireSignIn,
  alowedTo("admin", "user", "doctor"),
  createUserValidator,
  createUser
);

router.post(
  "/login",
  requireSignIn,
  alowedTo("admin", "user", "doctor"),
  loginValidator,
  login
);

// @desc Update Logged User
// @access Protect
router.put(
  "/",
  requireSignIn,
  alowedTo("admin", "user", "doctor"),
  updateUserValidator,
  updateUser
);

// @desc Change Logged User Password
// @access Protect
router.put(
  "/change-password",
  requireSignIn,
  alowedTo("user", "admin", "doctor"),
  changeUserPasswordValidator,
  changeUserPassword
);

// @desc Permanantly Delete An Account
// @access Protect
router.delete(
  "/delete-account",
  requireSignIn,
  alowedTo("user", "admin", "doctor"),
  deleteAccount
);

// @desc Delete a User
// @access Private/Admin
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user", "doctor"),
  deleteUserValidator,
  deleteUser
);

// @desc Get All Users
router.get("/", allUsers);

// @desc Get All Users role:Doctor
router.get("/doctors", getAllDoctor);

// @desc Get a Single User
router.get("/:id", getUserValidator, getUser);

// @desc Uploaded profile image
// @access Protect
router.post(
  "/profile-photo-upload",
  requireSignIn,
  alowedTo("user", "admin", "doctor"),
  uploadProfileImage,
  profilePhotoUpload
);

// @desc Who view my profile
// @access Protect
router.get(
  "/profile-viewers/:id",
  requireSignIn,
  alowedTo("user"),
  whoViewMyProfileValidator,
  whoViewMyProfile
);

// @desc Follow User
// @access Protect
router.get(
  "/following/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  following
);

// @desc Unfollow User
// @access Protect
router.get(
  "/unfollow/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  Unfollowing
);

// @desc Block User
// @access Protect
router.get(
  "/block/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  block
);

// @desc unblock User
// @access Protect
router.get(
  "/unblock/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  unblock
);

// @desc admin block users
// @access Admin
router.get(
  "/admin-block/:id",
  requireSignIn,
  alowedTo("admin"),
  followValidator,
  block_admin
);

// @desc admin unblock users
// @access Admin
router.get(
  "/admin-unblock/:id",
  requireSignIn,
  alowedTo("admin"),
  followValidator,
  unblockUser_admin
);

module.exports = router;
