const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profiles/me
// @desc    get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name']
		);

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/profiles
// @desc    get user contacts' profiles
// @access  private
router.get('/', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		});

		const query = profile.contacts.map((contact) => contact.id);

		const profiles = await Profile.find({
			user: { $in: query },
		}).populate('user', ['name']);

		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/profiles/:user
// @desc    get profile by user
// @access  public
router.get('/:user', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user,
		})
			.select('-contacts -blocklist')
			.populate('user', ['name', 'avatar']);

		if (!profile)
			return res.status(400).json({
				errors: [{ msg: 'Profile not found' }],
			});

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({
				errors: [{ msg: 'Profile not found' }],
			});
		}
		res.status(500).send('Server Error');
	}
});

// @route    POST api/profiles
// @desc     Create user profile
// @access   Private
router.post(
	'/',
	[auth, [body('name.first', 'First name is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			name: { first, last },
			bio,
		} = req.body;

		try {
			let newProfile = new Profile({
				user: req.user.id,
				name: {
					first,
				},
			});

			if (last) newProfile.name.last = last;
			if (bio) newProfile.bio = bio;

			profile = newProfile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

// @route    PUT api/profiles/
// @desc     Update user profile
// @access   Private
router.put('/', auth, async (req, res) => {
	const {
		name: { first, last },
		bio,
		blocklist: { block, unblock },
		status,
	} = req.body;

	// Build profile data
	const profileData = {
		name: {
			first,
		},
	};

	if (status) profileData.status = status;
	if (last) profileData.name.last = last;
	if (bio) profileData.bio = bio;

	try {
		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: profileData },
			{ new: true }
		);

		if (!profile) {
			const errors = [{ msg: 'Invalid request' }];
			return res.status(400).json({ errors });
		} else {
			res.json(profile);
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route    PUT api/profiles/add-contact
// @desc     Add new contact
// @access   Private
router.put('/add-contact', auth, async (req, res) => {
	const { contact } = req.body;

	try {
		if (contact.id._id === req.user.id) {
			const errors = [{ msg: 'Invalid contact' }];
			return res.status(400).json({ errors });
		} else {
			const profile = await Profile.findOneAndUpdate(
				{ user: req.user.id, 'contacts.id': { $ne: contact.id } },
				{ $push: { contacts: contact } },
				{ new: true }
			);

			if (!profile) {
				const errors = [{ msg: 'Invalid request' }];
				return res.status(400).json({ errors });
			} else {
				res.json(profile);
			}
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route    PUT api/profiles/remove-contact
// @desc     Remove contact
// @access   Private
router.put('/remove-contact', auth, async (req, res) => {
	const { contact } = req.body;

	try {
		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id, 'contacts.id': { $eq: contact.id } },
			{ $pull: { contacts: contact } },
			{ new: true }
		);

		if (!profile) {
			const errors = [{ msg: 'Invalid request' }];
			return res.status(400).json({ errors });
		} else {
			res.json(profile);
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route   DELETE api/profiles/
// @desc    Delete profile and user
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
