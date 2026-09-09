const { body } = require("express-validator");

const createLibraryRecordValidator = [

    body("bookId")
        .notEmpty()
        .withMessage("Book is required")
        .isMongoId()
        .withMessage("Invalid Book ID"),

    body("userId")
        .notEmpty()
        .withMessage("User is required")
        .isMongoId()
        .withMessage("Invalid User ID"),

    body("issueDate")
        .notEmpty()
        .withMessage("Issue Date is required")
        .isISO8601()
        .withMessage("Invalid Issue Date"),

    body("returnDate")
        .notEmpty()
        .withMessage("Return Date is required")
        .isISO8601()
        .withMessage("Invalid Return Date"),

    body("isReturned")
        .optional()
        .isBoolean()
        .withMessage("isReturned must be true or false")

];

module.exports = {createLibraryRecordValidator};