const express = require('express');
const connectDB = require('./config/db');
const friendRoutes = require('./routes/friendRoutes');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const morgan = require('morgan');

// Load environment variables from .env file
if (dotenv.error) {
	throw dotenv.error;
}

// Connect to MongoDB
connectDB();

const app = express();

// middleware
app.use(bodyparser.json());
app.use(morgan('dev'));

// routes
app.use('/api/friends', friendRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
