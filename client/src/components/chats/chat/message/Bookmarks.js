import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

const Bookmarks = ({ chat: { chat, loading }, user }) => {
	const [open, setOpen] = useState(false);
	const [bookmarks, setBookmarks] = useState([]);

	const onBookmarkClick = () => {
		console.log('Bookmark was clicked');
	};

	useEffect(() => {
		if (chat && !loading) {
			setBookmarks(
				chat.participants.filter((p) => p.id === user._id)[0].bookmarks
			);
		}
	}, [chat, loading, user._id]);

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
							bookmarks
								.filter((p) => p.id === user._id)[0]
								.bookmarks.map((bookmark) => (
									<div
										className='bookmark'
										onClick={onBookmarkClick}>
										<small className='bookmark-date'>
											<Moment format='MMM Do YY'>
												{bookmark.date}
											</Moment>
										</small>
										<p className='bookmark-text'>
											{bookmark.text}
										</p>
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
	user: state.auth.user,
	chat: state.chat,
});

export default connect(mapStateToProps, null)(Bookmarks);
