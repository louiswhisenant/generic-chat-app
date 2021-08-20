const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	participants: [
		{
			id: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
			name: {
				type: String,
				required: true,
			},
			role: {
				type: String,
				enum: ['author', 'admin', 'participant'],
				required: true,
				default: 'participant',
			},
		},
	],
	desc: {
		type: String,
	},
	name: {
		type: String,
	},
	messages: [
		{
			status: {
				type: String,
				enum: ['sent', 'delivered', 'read', 'error', 'loading'],
				required: true,
				default: 'loading',
			},
			text: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Post = mongoose.model('post', PostSchema);
