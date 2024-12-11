const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register a new user
exports.registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ error: 'User already exists' });
		}
		// Create new user
		const user = new User({ name, email, password });
		await user.save();
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} catch (error) {
		res.status(500).json({ message: 'Error registering user', error });
	}
}

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });


		if (user && await user.matchPassword(password)) {
			return res.status(200).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user.id),
			});
		} else {
			res.status(401).json({ error: 'Invalid email or password' });
		}

	} catch (error) {
		res.status(500).json({ message: 'Error logging in', error });
	}

}

