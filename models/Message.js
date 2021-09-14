const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		chat: {
			type: Schema.Types.ObjectId,
			ref: 'chat',
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
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
		reply: {
			text: {
				type: String,
			},
			id: {
				type: Schema.Types.ObjectId,
				ref: 'message',
			},
			author: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		},
		deliverAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true }
);

module.exports = Message = mongoose.model('message', MessageSchema);
