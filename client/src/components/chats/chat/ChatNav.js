import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { clearSelectedMessages } from '../../../redux/actions/message';

const ChatNav = ({
	chat: { chat, loading },
	selected,
	clearSelectedMessages,
}) => {
	const onDelete = () => {
		console.log('delete message(s)');
	};

	const onClear = () => {
		clearSelectedMessages();
	};

	const messageSelected = (
		<div className='message-context-options'>
			{selected.length === 1 && (
				<Fragment>
					<i className='fas fa-pen'></i>
					<i className='fas fa-copy'></i>
				</Fragment>
			)}
			<i className='fas fa-trash' onClick={onDelete}></i>
			<i className='fas fa-times clear-selected' onClick={onClear}></i>
		</div>
	);

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

			{selected.length > 0 && messageSelected}
		</Navbar>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
	selected: state.message.selected,
});

export default connect(mapStateToProps, { clearSelectedMessages })(ChatNav);
