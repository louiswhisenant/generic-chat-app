import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ChatNav = ({ chat: { chat, loading } }) => {
	return (
		<Navbar dark className='fixed-top' id='chat-nav'>
			<Link to='/chats' className='back-to-chats'>
				<i className='fas fa-arrow-left'></i>
			</Link>

			<NavbarBrand>
				{!loading && chat !== null
					? chat.name
						? chat.name
						: 'generic-chat-app'
					: 'connecting...'}
			</NavbarBrand>
		</Navbar>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
});

export default connect(mapStateToProps, null)(ChatNav);
