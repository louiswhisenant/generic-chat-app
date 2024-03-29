import { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
	deselectMessage,
	selectMessage,
	clearSelectedMessages,
} from '../../../../redux/actions/message';
import { setAlert } from '../../../../redux/actions/alert';
import MessageError from './MessageError';
// import useOnScreen from '../../../../utils/useOnScreen';

const Message = ({
	message,
	messages,
	auth: { user, loading },
	selected,
	selectMessage,
	deselectMessage,
	clearSelectedMessages,
	setAlert,
}) => {
	const replyRef = useRef(null);
	// const seenRef = useRef(null);
	// const isVisible = useOnScreen(seenRef);
	const { text, createdAt, updatedAt, status, author, _id, reply } = message;

	const onReplyClick = (id) => {
		clearSelectedMessages();
		const originalMessage = messages.find((msg) => msg._id === id);
		const originalEl = document.getElementById(id);

		if (originalEl) {
			originalEl.scrollIntoView({
				block: 'center',
				behavior: 'smooth',
			});

			setTimeout(() => {
				selectMessage(originalMessage);
			}, 250);
		} else {
			setAlert('The original message no longer exists', 'danger');
		}
	};

	const onClick = (e, message) => {
		if (replyRef.current && replyRef.current.contains(e.target)) {
			return;
		} else {
			document.removeEventListener('click', clickListener);

			if (
				selected.find(
					(obj) => obj._id === message._id || obj.id === message._id
				)
			) {
				deselectMessage(message._id);
				deselectMessage(message.id);
			} else {
				selectMessage(message);
			}
		}
	};

	const clickListener = (e) => {
		if (replyRef.current && replyRef.current.contains(e.target)) {
			return;
		}
	};

	useEffect(() => {
		document.addEventListener('click', clickListener);
		return () => {
			document.removeEventListener('click', clickListener);
		};
		// eslint-disable-next-line
	}, []);

	// @TODO apdate to useMemo
	// useEffect(() => {
	// 	if (isVisible && user._id !== author && status !== 'read') {
	// 		editMessage(chat, _id, { status: 'read' });
	// 	}
	// }, [user, author, isVisible, status, chat, _id]);

	return (
		!loading && (
			<div
				className={`message ${
					author === user._id ? 'user-true' : 'user-false'
				} ${
					selected.find((obj) => obj._id === _id || obj.id === _id)
						? 'message-selected'
						: ''
				}`}
				onClick={(e) => {
					onClick(e, message);
				}}
				id={_id}>
				<div className='message-info'>
					<Moment format='hh:mm a' className='message-info-time'>
						{updatedAt}
					</Moment>
					{updatedAt !== createdAt && (
						<span className='message-info-edited'>edited</span>
					)}
					<div className='message-info-status-anchor'>
						{status === 'sent' ? (
							<i className='fas fa-check message-info-status status-sent'></i>
						) : status === 'delivered' ? (
							<Fragment>
								<i className='fas fa-check message-info-status status-delivered'></i>{' '}
								<i className='fas fa-check message-info-status status-delivered'></i>
							</Fragment>
						) : status === 'read' ? (
							<Fragment>
								<i className='fas fa-check message-info-status status-read'></i>{' '}
								<i className='fas fa-check message-info-status status-read'></i>
							</Fragment>
						) : status === 'error' ? (
							<i className='fas fa-exclamation-triangle message-info-status status-error'></i>
						) : (
							''
						)}
					</div>
				</div>

				{reply && (
					<div className='message-reply'>
						<p className='message-reply-author'>{reply.author}</p>
						<p className='message-reply-text'>{reply.text}</p>
						<div
							className='message-reply-scroll'
							ref={replyRef}
							onClick={() => {
								onReplyClick(reply.id);
							}}>
							<i className='fas fa-comment-alt'></i>
						</div>
					</div>
				)}

				{status === 'error' && <MessageError message={message} />}

				<p className='message-text'>{text}</p>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	selected: state.message.selected,
	messages: state.message.messages,
});

export default connect(mapStateToProps, {
	selectMessage,
	deselectMessage,
	clearSelectedMessages,
	setAlert,
})(Message);
