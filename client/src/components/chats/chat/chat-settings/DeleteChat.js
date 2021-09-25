import { useState } from 'react';
import { deleteChat } from '../../../../redux/actions/chat';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const DeleteChat = ({ chat, deleteChat }) => {
	const [modal, setModal] = useState(false);
	const history = useHistory();

	const onClick = (e) => {
		e.preventDefault();

		deleteChat(chat._id);

		history.push('/dash');
	};

	return (
		<div id='delete-chat'>
			<button
				className='btn btn-red delete-chat-trigger'
				onClick={(e) => {
					setModal(true);
				}}>
				Delete Chat
			</button>

			{modal && (
				<div className='delete-chat-modal'>
					<h2 className='delete-acount-title color-red title'>
						Attention
					</h2>
					<h5 className='delete-acount-title color-4 title'>
						{chat.name ? chat.name : chat._id}
					</h5>
					<p className='delete-chat-prompt'>
						This will permanently delete the chat and all messages
						for all participants. This action cannot be undone. Are
						you sure you wish to proceed?
					</p>

					<div className='delete-chat-actions'>
						<button
							onClick={(e) => {
								onClick(e);
							}}
							className='delete-chat-confirm-btn btn btn-red'>
							Confirm
						</button>
						<button
							onClick={() => {
								setModal(false);
							}}
							className='delete-chat-cancel-btn btn btn-secondary'>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat.chat,
});

export default connect(mapStateToProps, { deleteChat })(DeleteChat);
