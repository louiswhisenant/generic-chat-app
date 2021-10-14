import React from 'react';
import { createChat } from '../../redux/actions/chat';
import { removeContact } from '../../redux/actions/profile';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

const ContactActions = ({
	profile,
	chat: { chat, chats },
	user,
	createChat,
	removeContact,
}) => {
	const history = useHistory();

	const goToChat = (id) => {
		let isChat;

		// Look for an already existing chat that matches participants...
		chats.forEach((chat) => {
			const check = chat.participants.filter(
				(p) => p.id === user._id || p.id === id
			);

			if (check.length === 2) {
				isChat = chat._id;
			} else {
				return;
			}
		});

		// ...if it exists, push to that chat, else create
		if (isChat) {
			history.push(`/chats/${isChat}`);
		} else {
			const data = {
				invites: [
					{
						id,
						role: 'admin',
					},
				],
			};

			createChat(data);

			history.push(`/chats/${chat}`);
		}
	};

	return (
		<div className='contact-actions'>
			<button className='btn btn-4'>
				<i className='fas fa-search'></i>
			</button>
			<button
				className='btn btn-3'
				onClick={() => {
					goToChat(profile.user._id);
				}}>
				<i className='fas fa-comment-alt'></i>
			</button>
			<button
				className='btn btn-red'
				onClick={() => {
					removeContact({
						id: profile.user._id,
					});
				}}>
				<i className='fas fa-user-minus'></i>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	chat: state.chat,
});

export default connect(mapStateToProps, { createChat, removeContact })(
	ContactActions
);
