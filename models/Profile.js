const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
		unique: true,
	},
	name: {
		first: {
			type: String,
			// required: true,
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
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
				required: true,
			},
			nickname: {
				type: String,
				default: '',
			},
			_id: false,
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
