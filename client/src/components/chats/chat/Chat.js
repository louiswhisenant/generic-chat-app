import { Fragment, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getMessages } from '../../../redux/actions/message';
import { getBookmarks, getChat } from '../../../redux/actions/chat';
import Message from './message/Message';
import ChatNav from './ChatNav';
import NewMessage from './message/NewMessage';
import MessagePreview from './message/MessagePreview';
import Bookmarks from './Bookmarks';

const Chat = ({
	match,
	message: { message, messages, loading },
	chat,
	getMessages,
	getChat,
	getBookmarks,
}) => {
	useEffect(() => {
		getMessages(match.params.id);
		getChat(match.params.id);
		getBookmarks(match.params.id);
	}, [getMessages, getChat, getBookmarks, match]);

	useEffect(() => {
		if (!chat.loading && !loading && messages.length > 0) {
			const lastMessage = document.getElementById('last-message');

			lastMessage.scrollIntoView({
				block: 'start',
				behavior: 'smooth',
			});
		}
	}, [chat.loading, messages, loading]);

	return (
		!chat.loading && (
			<div id='chat'>
				<ChatNav chatId={match.params.id} />
				<div id='chat-messages'>
					<Bookmarks />
					<div className='chat-fade'></div>
					{!loading && messages.length > 0 ? (
						<Fragment>
							{messages.map((message) => (
								<Message message={message} key={message._id} />
							))}
							<div
								className='last-message'
								id='last-message'></div>
						</Fragment>
					) : !loading && messages.length === 0 ? (
						<div className='no-messages-yet'>No messages yet.</div>
					) : (
						<Spinner />
					)}
				</div>
				{!loading &&
					message !== null &&
					message.type !== 'bookmark' && <MessagePreview />}
				<NewMessage chat={match.params.id} />
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	message: state.message,
	chat: state.chat,
});

export default connect(mapStateToProps, {
	getMessages,
	getChat,
	getBookmarks,
})(Chat);
