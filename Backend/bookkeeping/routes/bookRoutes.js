const express = require('express');
const router = express.Router();

// importing controller
const { addBook, getBooks, updateBook, deleteBook } = require('../controllers/booksController');

// importing validator
const {createBookValidator} = require('../validators/bookValidator');

router.post('/add-book',createBookValidator, addBook);
router.get('/get-books', getBooks);
router.put('/update-book/:id', updateBook);
router.delete('/delete-book/:id', deleteBook);

module.exports = router;