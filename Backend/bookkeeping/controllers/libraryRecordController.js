const LibraryRecordModel = require('../models/libraryRecord');

const addLibraryRecord = async (req, res) => {
    try 
    {
        const { book, user, issueDate, returnDate, isReturned } = req.body;

        const libraryRecord = await LibraryRecordModel.create({book, user ,issueDate,returnDate,isReturned});

        res.status(201).json
        ({
            message: "Library record added successfully",
            libraryRecord
        });

    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getLibraryRecords = async (req, res) => {
    try 
    {
        const libraryRecords = await LibraryRecordModel.find();

        res.status(200).json({ libraryRecords });

    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateLibraryRecord = async (req, res) => {
    try 
    {
        const { id } = req.params;
        const { book, user, issueDate, returnDate, isReturned } = req.body;

        const libraryRecord = await LibraryRecordModel.findByIdAndUpdate(
            id,
            { book, user, issueDate, returnDate, isReturned },
            { new: true }
        );

        res.status(200).json
        ({
            message: "Library record updated successfully",
            libraryRecord
        });

    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteLibraryRecord = async (req, res) => {
    try 
    {
        const { id } = req.params;

        const libraryRecord = await LibraryRecordModel.findByIdAndDelete(id);

        res.status(200).json
        ({
            message: "Library record deleted successfully",
            libraryRecord
        });

    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {addLibraryRecord,getLibraryRecords,updateLibraryRecord,deleteLibraryRecord};