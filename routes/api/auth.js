const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const { JWT_SECRET } = config;

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/auth/:username
// @desc    Test route
// @access  Private
router.get('/:username', auth, async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });

		if (!user) {
			return res.status(404).json({
				errors: [{ msg: 'User not found' }],
			});
		} else {
			res.json(user._id);
		}
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(404).json({
				errors: [{ msg: 'User not found' }],
			});
		}
		res.status(500).send('Server Error');
	}
});

// @route   POST api/auth
// @desc    Login user
// @access  Public
router.post(
	'/',
	[
		body('account', 'Valid email or username required').not().isEmpty(),
		body('password', 'Password required').exists(),
	],
	async (req, res) => {
		// set validationResult
		const errors = validationResult(req);
		// check for validation errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// else
		const { account, password } = req.body;

		try {
			let user = await User.findOne({
				$or: [{ email: account }, { username: account }],
			});

			if (!user) {
				return res.status(400).json({
					errors: [{ msg: 'Invalid credentials' }],
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({
					errors: [{ msg: 'Invalid credentials' }],
				});
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				JWT_SECRET,
				{ expiresIn: 86400 }, // 24 hours
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
