// Routes decide which fun to run when user sends request

const express = require('express');
const router = express.Router();

// Import Controller Functions
const {addCategory, getCategories, updateCategory, deleteCategory} = require('../controllers/categoryController');

// importing validator
const {createCategoryValidator} = require ('../validators/categoryValidator');

router.post('/add-category', createCategoryValidator, addCategory);
router.get('/get-categories', getCategories);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

module.exports = router;