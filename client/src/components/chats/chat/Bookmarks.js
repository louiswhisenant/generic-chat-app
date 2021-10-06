import { useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { setAlert } from '../../../redux/actions/alert';
import {
	clearSelectedMessages,
	selectMessage,
} from '../../../redux/actions/message';
import { editBookmarks } from '../../../redux/actions/chat';

const Bookmarks = ({
	chat: { chat, bookmarks, loading },
	user,
	setAlert,
	selectMessage,
	clearSelectedMessages,
	editBookmarks,
}) => {
	const [open, setOpen] = useState(false);
	const [actions, setActions] = useState(null);

	const onBookmarkClick = (id) => {
		actions === id ? setActions(null) : setActions(id);
	};

	const onScroll = (message) => {
		const bookmark = document.getElementById(`${message.id}`);

		if (bookmark) {
			clearSelectedMessages();

			bookmark.scrollIntoView({
				block: 'center',
				behavior: 'smooth',
			});

			setTimeout(() => {
				selectMessage(message);
			}, 250);

			setOpen(false);
		} else {
			setAlert('The original message no longer exists', 'danger');
		}
	};

	const onCopy = () => {
		setAlert('Message copied to clipboard', 'success');
	};

	const onDelete = (id) => {
		const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);

		editBookmarks(chat._id, user._id, { bookmarks: newBookmarks });
	};

	return (
		<div id='bookmarks-anchor'>
			<div
				className='bookmarks-trigger'
				onClick={() => {
					setOpen(!open);
				}}>
				<i className='fas fa-bookmark'></i>
			</div>

			{open && (
				<div className='bookmarks'>
					<i
						className='fas fa-times bookmarks-close'
						onClick={() => {
							setOpen(false);
						}}></i>

					{chat && !loading ? (
						bookmarks.length > 0 ? (
							bookmarks.map((bookmark) => (
								<div className='bookmark' key={bookmark.id}>
									<div
										className='bookmark-content'
										onClick={() => {
											onBookmarkClick(bookmark.id);
										}}>
										<small className='bookmark-date'>
											<Moment format='MMM Do YY'>
												{bookmark.date}
											</Moment>
										</small>
										<p className='bookmark-text'>
											{bookmark.text}
										</p>
									</div>
									{actions === bookmark.id && (
										<div className='bookmark-actions'>
											<i
												className='fas fa-search'
												onClick={() => {
													onScroll(bookmark);
												}}></i>
											<i
												className='fas fa-copy'
												onClick={onCopy}></i>
											<i
												className='fas fa-trash'
												onClick={() => {
													onDelete(bookmark.id);
												}}></i>
										</div>
									)}
									<hr />
								</div>
							))
						) : (
							<div className='no-bookmarks'>
								<h4 className='no-bookmarks-title'>
									No bookmarks yet.
								</h4>
								<p className='no-bookmarks-text'>
									Save your favorite messages here by
									selecting the message and clicking the
									bookmark icon.
								</p>
							</div>
						)
					) : (
						<Spinner />
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
	user: state.auth.user,
});

export default connect(mapStateToProps, {
	setAlert,
	selectMessage,
	clearSelectedMessages,
	editBookmarks,
})(Bookmarks);
