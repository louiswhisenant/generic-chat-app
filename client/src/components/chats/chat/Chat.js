import { Fragment, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getMessages } from '../../../redux/actions/message';
import { getChat } from '../../../redux/actions/chat';
import Message from './message/Message';
import ChatNav from './ChatNav';
import NewMessage from './message/NewMessage';
import MessagePreview from './message/MessagePreview';

const Chat = ({
	match,
	message: { message, messages, loading },
	chat,
	getMessages,
	getChat,
}) => {
	useEffect(() => {
		getMessages(match.params.id);
		getChat(match.params.id);
	}, [getMessages, getChat, match]);

	return (
		!chat.loading && (
			<div id='chat'>
				<ChatNav chatId={match.params.id} />
				<div id='chat-messages'>
					<div className='chat-fade'></div>
					{!loading && messages.length > 0 ? (
						<Fragment>
							{messages.map(
								({
									text,
									createdAt,
									updatedAt,
									status,
									author,
									_id,
								}) => (
									<Message
										text={text}
										createdAt={createdAt}
										updatedAt={updatedAt}
										status={status}
										author={author}
										id={_id}
									/>
								)
							)}
							<div className='last-message' id='last-message'>
								.
							</div>
						</Fragment>
					) : (
						<Spinner />
					)}
				</div>
				{!loading && message !== null && <MessagePreview />}
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
})(Chat);
