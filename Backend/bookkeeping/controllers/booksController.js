
// A controller contains the logic for what should happen when the user sends a request

// import Model to work with Book Collection in MongoDb
const BookModel = require('../models/BooksModel');

// Add a book
const addBook = async(req, res) => {
    try
    {
        const {title, author, category, quantity} = req.body;

        // checks if book is already present
        const books = await BookModel.find({title, author})
        if(books.length > 0)
            {
            return res.status(400).json({message: 'Book already exists'});
            }

        // if book is not present/exists
        const book = await BookModel.create({title, author, category, quantity});
        res.status(201).json({message: 'Book added successfully', book});
    }

    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

// Get a Book
const getBooks = async(req, res) => {
    try 
    {
        // gives every book in collection
        const books = await BookModel.find();
        res.status(200).json({books});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

// Update a Book
const updateBook = async(req, res) => {
    try 
    {
        // Get book ID
        const {id} = req.params;

        const {title, author, quantity, category} = req.body;
        // Update in MongoDB
        const book = await BookModel.findByIdAndUpdate(id, {title, author, quantity, category}, {new: true});
        res.status(200).json({message: 'Book updated successfully', book});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

// Delete a Book
const deleteBook = async(req, res) => {
    try 
    {
        // Get book ID
        const {id} = req.params;
        // Find and delete it
        const book = await BookModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Book deleted successfully', book});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

module.exports = { addBook, getBooks, updateBook, deleteBook };