const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Message = require('../../models/Message');
const User = require('../../models/User');
const config = require('../../config');
const CryptoJS = require('crypto-js');

const { CRYPTO_KEY } = config;

// @route   POST api/messages/:chat
// @desc    Create message
// @access  Private
router.post(
	'/:chat',
	[auth, [body('text', 'Message cannot be empty').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const encryptedText = CryptoJS.AES.encrypt(
				req.body.text,
				CRYPTO_KEY
			).toString();

			// TODO: Validate that user is authorized to post to this chat.

			const newMessage = new Message({
				chat: req.params.chat,
				author: req.user.id,
				text: encryptedText,
			});

			const message = await newMessage.save();

			res.json(message);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   GET api/messages/:chat
// @desc    Get all chat messages
// @access  Private
router.get('/:chat', auth, async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chat }).sort({
			createdAt: -1,
		});

		messages.forEach((message) => {
			var bytes = CryptoJS.AES.decrypt(message.text, CRYPTO_KEY);
			var decryptedText = bytes.toString(CryptoJS.enc.Utf8);
			message.text = decryptedText;
		});

		res.json(messages);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/messages/:chat/:message
// @desc    Edit message
// @access  Private
router.put(
	'/:chat/:message',
	[auth, [body('text', 'Message cannot be empty').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const message = await Message.findOne({
				chat: req.params.chat,
				_id: req.params.message,
			});

			if (!message) {
				return res.status(404).json({ msg: 'Message not found' });
			}

			if (message.author.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'User not authorized' });
			}

			const encryptedText = CryptoJS.AES.encrypt(
				req.body.text,
				CRYPTO_KEY
			).toString();

			message.text = encryptedText;

			await message.save();

			res.json(message);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   DELETE api/messages/:chat/:message
// @desc    Delete a chat
// @access  Private
router.delete('/:chat/:message', auth, async (req, res) => {
	try {
		const message = await Message.findOne({
			chat: req.params.chat,
			_id: req.params.message,
		});

		if (!message) {
			return res.status(404).json({ msg: 'Message not found' });
		}

		await message.remove();

		res.json({ msg: 'Message deleted' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Message not found' });
		}
		res.status(500).send('Server Error');
	}
});

module.exports = router;
