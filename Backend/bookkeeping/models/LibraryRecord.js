const mongoose = require('mongoose');

const LibraryRecordSchema = new mongoose.Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    issueDate:{
        type: Date,
        required: true,
    },
    returnDate:{
        type: Date,
        required: true,
    },
    isReturned:{
        type: Boolean,
        required: true
    }
})


const LibraryRecordModel = mongoose.model("LibraryRecord", LibraryRecordSchema);

module.exports = LibraryRecordModel;    