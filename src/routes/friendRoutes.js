const express = require('express');
const friendController = require('../controllers/friendController');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, friendController.getAllFriends);
router.get('/:id', protect, friendController.getFriendById);
router.post('/', protect, friendController.addFriend);
router.delete('/:id', protect, friendController.deleteFriend);
router.put('/:id', protect, friendController.updateFriend);

module.exports = router;
