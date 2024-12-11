const Friend = require('../models/friendModel');
const { validationResult } = require('express-validator');

// Get all friends
exports.getAllFriends = async (req, res) => {
	try {
		const friends = await Friend.find();
		res.json(friends);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

// Get a freind by ID
exports.getFriendById = async (req, res) => {
	try {
		const friend = await Friend.findById(req.params.id);
		if (!friend) {
			return res.status(404).json({ error: 'Friend not found' });
		}
		res.json(friend);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

// Add a new Friend
exports.addFriend = async (req, res) => {
	try {
		const { name, age } = req.body;
		if (!name || !age) return res.status(400).json({ message: "Name and Age are required!" })

		const friend = new Friend({ name, age });
		await friend.save();

		res.status(201).json({ message: 'Friend added successfully', friend: { name, age } });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
}

// Delete Friend
exports.deleteFriend = async (req, res) => {
	try {
		const friend = await Friend.findByIdAndDelete(req.params.id);

		if (!friend) {
			return res.status(404).json({ error: 'Friend not found' });
		}

		res.status(201).json({ message: 'Friend deleted successfully', id: req.params.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}

// Update Friend
exports.updateFriend = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, age } = req.body;

		// Find the friend by ID and update their data
		const updatedFriend = await Friend.findByIdAndUpdate(id, { name, age }, { new: true, runValidators: true });

		if (!updatedFriend) {
			return res.status(404).json({ message: 'Friend not found', errors: validationResult(req).array() });
		}

		res.status(200).json({ message: 'Friend updated successfully', friend: updatedFriend });


	} catch (error) {
		res.status(500).json({ message: 'Error updating friend', err });
	}
}
