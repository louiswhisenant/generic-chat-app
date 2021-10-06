const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Message = require('../../models/Message');
const User = require('../../models/User');

const { encryptString, decryptString } = require('../../utils/encryption');

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
			// TODO: Validate that user is authorized to post to this chat.

			const newMessage = new Message({
				chat: req.params.chat,
				author: req.user.id,
				text: encryptString(req.body.text),
			});

			if (req.body.deliverAt) {
				newMessage.deliverAt = req.body.deliverAt;
			}
			if (req.body.reply) {
				newMessage.reply = {
					text: encryptString(req.body.reply.text),
					id: req.body.reply.id,
					author: req.body.reply.author,
				};
			}

			const message = await newMessage.save();

			message.text = decryptString(message.text);

			if (message.reply.id && message.reply.text) {
				message.reply.text = decryptString(message.reply.text);
			}

			res.json(message);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   GET api/messages/:chat/:message
// @desc    Get single message
// @access  Private
router.get('/:chat/:message', auth, async (req, res) => {
	try {
		const message = await Message.findOne({
			chat: req.params.chat,
			_id: req.params.message,
		});

		message.text = decryptString(message.text);

		if (message.reply.id && message.reply.text) {
			message.reply.text = decryptString(message.reply.text);
		}

		res.json(message);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/messages/:chat
// @desc    Get all chat messages
// @access  Private
router.get('/:chat', auth, async (req, res) => {
	try {
		const messages = await Message.find({
			chat: req.params.chat,
			deliverAt: { $lte: Date.now() },
		}).sort({
			createdAt: 1,
		});

		messages.forEach((message) => {
			message.text = decryptString(message.text);

			if (message.reply.id && message.reply.text) {
				message.reply.text = decryptString(message.reply.text);
			}
		});

		res.json(messages);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/messages/:chat/:message
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

			message.text = encryptString(req.body.text);

			await message.save();

			message.text = decryptString(message.text);

			if (message.reply.id && message.reply.text) {
				message.reply.text = decryptString(message.reply.text);
			}

			res.json(message);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   DELETE api/messages/:chat
// @desc    Delete a chat
// @access  Private
router.delete('/:chat', auth, async (req, res) => {
	try {
		await Message.deleteMany({
			chat: req.params.chat,
			_id: { $in: req.body.selected },
		});

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
