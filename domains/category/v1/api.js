const express = require("express");
const router = express.Router();

const {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  getCategoryValidator,
} = require("./validation");

const {
  createCategory,
  updateCategory,
  allCategories,
  getCategory,
  deleteCategory,
} = require("./controller");

const { requireSignIn, alowedTo } = require("../../../middlewares/authMiddlewares");

// @desc Create Category
router.post(
  "/",
  // requireSignIn,
  // alowedTo("admin"),
  createCategoryValidator,
  createCategory
);

// @desc Update Category
router.put(
  "/:id",
  // requireSignIn,
  // alowedTo("admin"),
  updateCategoryValidator,
  updateCategory
);

// @desc get all Categories
router.get("/", allCategories);

// @desc get a single Category
router.get("/:id", getCategoryValidator, getCategory);

// @desc Delete a Category
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user", "doctor"),
  deleteCategoryValidator,
  deleteCategory
);

module.exports = router;
