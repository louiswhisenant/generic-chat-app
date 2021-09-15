import { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
	deselectMessage,
	selectMessage,
} from '../../../../redux/actions/message';

const Message = ({
	text,
	createdAt,
	updatedAt,
	status,
	author,
	auth: { user, loading },
	id,
	reply,
	selected,
	selectMessage,
	deselectMessage,
}) => {
	const replyRef = useRef(null);

	const onReplyClick = (id, author) => {
		const original = document.getElementById(id);

		original.scrollIntoView({
			block: 'center',
			behavior: 'smooth',
		});

		deselectMessage(id);

		setTimeout(() => {
			selectMessage({ id, author });
		}, 250);
	};

	const onClick = (e, id, author) => {
		if (replyRef.current && replyRef.current.contains(e.target)) {
			return;
		} else {
			document.removeEventListener('click', clickListener);

			selected.find((obj) => obj.id === id)
				? deselectMessage(id)
				: selectMessage({ id, author });
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

	return (
		!loading && (
			<div
				className={`message ${
					author === user._id ? 'user-true' : 'user-false'
				} ${
					selected.find((obj) => obj.id === id)
						? 'message-selected'
						: ''
				}`}
				onClick={(e) => {
					onClick(e, id, author);
				}}
				id={id}>
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
								onReplyClick(reply.id, reply.author);
							}}>
							<i className='fas fa-comment-alt'></i>
						</div>
					</div>
				)}

				<p className='message-text'>{text}</p>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	selected: state.message.selected,
});

export default connect(mapStateToProps, { selectMessage, deselectMessage })(
	Message
);
