const express = require('express');
const router = express.Router();

const {addLibraryRecord,getLibraryRecords,updateLibraryRecord,deleteLibraryRecord} = require('../controllers/libraryRecordController');

const {createLibraryRecordValidator} = require ('../validators/libararyValidator')

// Add a new library record
router.post('/add-record',createLibraryRecordValidator, addLibraryRecord);

// Get all library records
router.get('/get-records', getLibraryRecords);

// Update a library record by ID
router.put('/update-record/:id', updateLibraryRecord);

// Delete a library record by ID
router.delete('/delete-record/:id', deleteLibraryRecord);

module.exports = router;