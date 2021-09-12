import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import {
	clearSelectedMessages,
	deleteMessage,
	getMessage,
} from '../../../redux/actions/message';

const ChatNav = ({
	chat: { chat, loading },
	selected,
	chatId,
	user,
	getMessage,
	clearSelectedMessages,
	deleteMessage,
}) => {
	const onEdit = () => {
		getMessage(chatId, selected[0].id, 'edit');
	};

	const onReply = () => {
		getMessage(chatId, selected[0].id, 'reply');
	};

	const onCopy = () => {
		console.log('copy');
	};

	const onDelete = () => {
		const toDelete = selected.map((obj) => obj.id);
		deleteMessage(chatId, toDelete);
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

	const messageSelected = (
		<Fragment>
			<NavbarBrand className='count'>
				{selected.length} selected
			</NavbarBrand>

			<div className='message-context-options'>
				{selected.length === 1 && (
					<Fragment>
						{selected[0].author === user._id && (
							<i className='fas fa-pen' onClick={onEdit}></i>
						)}
						<i className='fas fa-reply' onClick={onReply}></i>
						<i className='fas fa-copy' onClick={onCopy}></i>
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
			<Link to='/dash' className='back-to-chats'>
				<i className='fas fa-arrow-left'></i>
			</Link>

			{selected.length > 0 ? messageSelected : nothingSelected}
		</Navbar>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
	selected: state.message.selected,
	user: state.auth.user,
});

export default connect(mapStateToProps, {
	getMessage,
	clearSelectedMessages,
	deleteMessage,
})(ChatNav);
