
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require ('dotenv').config();

const cors = require ('cors'); // frontend backend k different ports k liye 

const express = require('express');
const app = express();

const port = 3000;

const dotenv = require('dotenv');

const connectDb = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const libraryRoutes = require('./routes/libraryRecords');

dotenv.config()

connectDb();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/library', libraryRoutes);

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => 
    {
    console.log(`Server is running on port ${port}`);
    });
}
module.exports = app;