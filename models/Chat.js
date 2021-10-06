const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
	{
		participants: [
			{
				id: {
					type: Schema.Types.ObjectId,
					ref: 'user',
					required: true,
				},
				role: {
					type: String,
					enum: ['author', 'admin', 'participant'],
					required: true,
					default: 'participant',
				},
				bookmarks: [
					{
						_id: false,
						id: {
							type: Schema.Types.ObjectId,
							ref: 'message',
						},
						author: {
							type: Schema.Types.ObjectId,
							ref: 'user',
						},
						text: {
							type: String,
						},
						date: {
							type: Date,
						},
					},
				],
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
