const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
	{
		participants: [
			{
				id: {
					type: Schema.Types.ObjectId,
					ref: 'user',
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
	},
	{ timestamps: true }
);

module.exports = Chat = mongoose.model('chat', ChatSchema);
