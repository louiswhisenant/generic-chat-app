const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const { JWT_SECRET } = config;

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
	'/',
	[
		body('username', 'Username is required').not().isEmpty(),
		body('email', 'Valid email required').isEmail(),
		body('password', 'Password with 6+ characters is required').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		// set validationResult
		const errors = validationResult(req);
		// check for validation errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// else
		const { username, email, password } = req.body;

		try {
			let user = await User.findOne({ $or: [{ email }, { username }] });

			if (user && user.username === username) {
				return res.status(400).json({
					errors: [{ msg: 'Username already taken' }],
				});
			} else if (user && user.email === email) {
				return res.status(400).json({
					errors: [{ msg: 'Email already taken' }],
				});
			}

			user = new User({
				username,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

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
