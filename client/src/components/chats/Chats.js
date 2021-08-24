import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChats } from '../../redux/actions/chat';
import { Spinner } from 'reactstrap';

const Chats = ({ chat: { chats, loading }, getChats }) => {
	useEffect(() => {
		getChats();
	}, [getChats]);

	return (
		<div>
			{loading ? (
				<Spinner />
			) : (
				chats.map((chat) => (
					<Link
						to={`/chats/${chat._id}`}
						className='chat-link'
						key={chat._id}>
						<div className='chat'>
							<div className='chat-name'>
								{chat.name ? chat.name : 'NO NAME'}
							</div>
						</div>
					</Link>
				))
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
});

export default connect(mapStateToProps, { getChats })(Chats);
