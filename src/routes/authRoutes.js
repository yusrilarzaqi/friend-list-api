const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Register route
router.post('/register', [
	body('name').notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Email is invalid'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], registerUser)

// Login route
router.post('/login', [
	body('email').isEmail().withMessage('Email is invalid'),
	body('password').notEmpty().withMessage('Password is required'),
], loginUser)

module.exports = router;
