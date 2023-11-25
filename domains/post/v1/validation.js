const { body, validationResult } = require("express-validator");
const validatorResult = require("../../../middlewares/validatorMiddlewares");
const isValidObjectId = require("../../../utils/MongoObject/validMongoObjectid");
const Category = require("../../category/category");

exports.createPostValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is not allowed to be empty")
    .isLength({ max: 100 })
    .withMessage(
      "title length must be less than or equal to 100 characters long"
    )
    .isLength({ min: 5 })
    .withMessage("title length must be at least 5 characters long"),
  body("content")
    .notEmpty()
    .withMessage("content is not allowed to be empty")
    .isLength({ max: 1500 })
    .withMessage(
      "title length must be less than or equal to 1500 characters long"
    ),
  body("category")
    .notEmpty()
    .withMessage("category is not allowed to be empty")
    .custom(async (value, { req }) => {
      if (!isValidObjectId(value)) {
        throw new Error(`Invalid Category id format`);
      }

      // Check if category found
      const category = await Category.findById(value);
      if (!category) {
        throw Error(`No category for this id ${value}`);
      }
    }),

  validatorResult,
];

exports.updatePostValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Post id format`);
    }
    return true;
  }),

  body("title")
    .optional()
    .isLength({ max: 20 })
    .withMessage(
      "title length must be less than or equal to 20 characters long"
    )
    .isLength({ min: 2 })
    .withMessage("title length must be at least 2 characters long"),

  body("content")
    .optional()
    .isLength({ min: 2 })
    .withMessage("content length must be at least 2 characters long")
    .isLength({ max: 600 })
    .withMessage(
      "content length must be less than or equal to 600 characters long"
    ),

  validatorResult,
];

exports.removePostValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Post id format`);
    }
    return true;
  }),

  validatorResult,
];

exports.getPostValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Post id format`);
    }
    return true;
  }),

  validatorResult,
];
