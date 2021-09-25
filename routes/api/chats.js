const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Chat = require('../../models/Chat');
const Message = require('../../models/Message');
const User = require('../../models/User');

// @route   POST api/chats
// @desc    Create chat
// @access  Private
router.post(
	'/',
	[auth, [body('invites', 'Chat needs at least two users').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { invites, name, desc } = req.body;

		const chatReq = {
			participants: [...invites, { id: req.user.id, role: 'author' }],
		};

		if (name) chatReq.name = name;
		if (desc) chatReq.desc = desc;

		try {
			const newChat = new Chat(chatReq);

			const chat = await newChat.save();

			res.json(chat);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   POST api/chats/:chat
// @desc    Edit chat
// @access  Private
router.put('/:chat', auth, async (req, res) => {
	const { name, participants } = req.body;

	try {
		const chat = await Chat.findOne({
			_id: req.params.chat,
			'participants.id': req.user.id,
		});

		if (!chat) {
			return res.status(404).json({ msg: 'Request cannot be completed' });
		}

		if (name) chat.name = name;
		if (participants) Chat.participants = participants;
		chat.updatedAt = Date.now();
		chat.__v = chat.__v + 1;

		await chat.save();

		res.json(chat);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/chats
// @desc    Get all user chats
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const chats = await Chat.find({ 'participants.id': req.user.id }).sort({
			date: -1,
		});

		res.json(chats);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/chats/:id
// @desc    Get chat by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		const chat = await Chat.findOne({
			_id: req.params.id,
			'participants.id': req.user.id,
		});

		if (!chat) {
			return res.status(404).json({ msg: 'Chat not found' });
		}

		res.json(chat);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Chat not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/chats/:id
// @desc    Delete a chat
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const chat = await Chat.findOne({
			_id: req.params.id,
			'participants.id': req.user.id,
		});

		if (!chat) {
			return res.status(404).json({ msg: 'Chat not found' });
		}

		await Message.deleteMany({
			chat: req.params.id,
		});

		await chat.remove();

		res.json({ msg: 'Chat deleted' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Chat not found' });
		}
		res.status(500).send('Server Error');
	}
});

module.exports = router;
