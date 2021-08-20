const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		first: {
			type: String,
			required: true,
		},
		last: {
			type: String,
			default: '',
		},
	},
	status: {
		type: String,
		enum: ['offline', 'online', 'hidden'],
		required: true,
		default: 'hidden',
	},
	bio: {
		type: String,
		default: '',
	},
	contacts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	],
	blocklist: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
