const express = require('express');
const router = express.Router();

const upload = require("../Middleware/uploadMiddleware");

// Import Controller Functions
const { register, login, getUsers, forgotPassword, resetPassword } = require('../controllers/authController');

//Import Validators
const { registerValidator, loginValidator } = require('../validators/authValidator');

// for register
router.post('/register', upload.single("profilePicture"), registerValidator, register);
// for login
router.post('/login', loginValidator, login);
// for getting users inorder to display in library record drop-down
router.get('/getUsers', getUsers);
// for forget password
router.post('/forgotPassword',forgotPassword);
// for reset Password
router.post('/resetPassword', resetPassword);

module.exports = router;