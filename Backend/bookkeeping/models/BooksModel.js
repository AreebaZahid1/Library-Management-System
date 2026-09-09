const mongoose = require('mongoose');

// Create Schema
const BooksSchema = new mongoose.Schema({
    // Fields
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // The category field points to the Category model
        required: true,
    },
    // coverImage:{
    //     type: String,
    //     required: true,
    // },
    quantity:{
        type: Number,
        required: true,
    }

})

// Model banaya jis sy CRUD operations perform kr skty
const BooksModel = mongoose.model("Book", BooksSchema);

module.exports = BooksModel;