const { body } = require("express-validator");

const createBookValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Author name must be between 2 and 100 characters"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer"),

  // Uncomment if using cover image
  // body("coverImage")
  //   .notEmpty()
  //   .withMessage("Cover image is required")
  //   .isURL()
  //   .withMessage("Cover image must be a valid URL"),
];



module.exports = {createBookValidator};