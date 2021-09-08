import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import {
	clearSelectedMessages,
	deleteMessage,
} from '../../../redux/actions/message';

const ChatNav = ({
	chat: { chat, loading },
	selected,
	chatId,
	clearSelectedMessages,
	deleteMessage,
}) => {
	const onDelete = () => {
		console.log(chatId, selected);
		deleteMessage(chatId, selected);
	};

	const onClear = () => {
		clearSelectedMessages();
	};

	const nothingSelected = (
		<Fragment>
			<NavbarBrand className='navbar-brand-name'>
				{!loading && chat !== null
					? chat.name
						? chat.name
						: 'generic-chat-app'
					: 'connecting...'}
			</NavbarBrand>

			<div className='chat-context-options'>
				<Link to={`/chats/${chatId}/settings`}>
					<i className='fas fa-cog'></i>
				</Link>
			</div>
		</Fragment>
	);

	// @TODO - validate that single selected message is authored by user to show edit icon
	const messageSelected = (
		<Fragment>
			<NavbarBrand className='count'>
				{selected.length} selected
			</NavbarBrand>

			<div className='message-context-options'>
				{selected.length === 1 && (
					<Fragment>
						<i className='fas fa-pen'></i>
						<i className='fas fa-reply'></i>
						<i className='fas fa-copy'></i>
					</Fragment>
				)}
				<i className='fas fa-trash' onClick={onDelete}></i>
				<i
					className='fas fa-times clear-selected'
					onClick={onClear}></i>
			</div>
		</Fragment>
	);

	return (
		<Navbar dark className='fixed-top' id='chat-nav'>
			<Link to='/chats' className='back-to-chats'>
				<i className='fas fa-arrow-left'></i>
			</Link>

			{selected.length > 0 ? messageSelected : nothingSelected}
		</Navbar>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
	selected: state.message.selected,
});

export default connect(mapStateToProps, {
	clearSelectedMessages,
	deleteMessage,
})(ChatNav);
