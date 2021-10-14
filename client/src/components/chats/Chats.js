import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearChat, getChats } from '../../redux/actions/chat';
import { resetMessages } from '../../redux/actions/message';

import { Spinner } from 'reactstrap';
import Moment from 'react-moment';
import NewChat from './chat/NewChat';

const Chats = ({ chat: { chats, loading }, getChats, resetMessages }) => {
	useEffect(() => {
		getChats();
		resetMessages();
		clearChat();
	}, [getChats, resetMessages]);

	return (
		<div id='chats'>
			{loading ? (
				<Spinner />
			) : chats.length > 0 ? (
				chats.map((chat) => (
					<Link
						to={`/chats/${chat._id}#last-message`}
						className='chat-link'
						key={chat._id}>
						<div className='chat'>
							{chat.thumbnail ? (
								<div className='thumbnail'>
									{chat.thumbnail}
								</div>
							) : (
								<div className='avatar'>
									<p className='participants'>
										{chat.participants.map((p) =>
											p.id.charAt(0)
										)}
									</p>
								</div>
							)}
							<div className='chat-info'>
								<div className='chat-name'>
									{chat.name ? chat.name : 'NO NAME'}
								</div>
								<Moment fromNow>{chat.updatedAt}</Moment>
							</div>
						</div>
					</Link>
				))
			) : (
				<div className='no-chats'>No chats to show.</div>
			)}
			{!loading && <NewChat />}
		</div>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
});

export default connect(mapStateToProps, {
	getChats,
	resetMessages,
	clearChat,
})(Chats);
