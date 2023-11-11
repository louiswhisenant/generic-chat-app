import { connect } from 'react-redux';
import { resendMessage } from '../../../../redux/actions/message';

const MessageError = ({ message, messages, chat, user, resendMessage, id }) => {
	const onClick = (e) => {
		e.stopPropagation();

		console.log('resend message', message);
	};

	return (
		<div
			className='message-error'
			onClick={(e) => {
				onClick(e);
			}}>
			<i className='fas fa-sync'></i>
		</div>
	);
};

const mapStateToProps = (state) => ({
	messages: state.message.messages,
	chat: state.chat.chat,
	user: state.auth.user,
});

export default connect(mapStateToProps, { resendMessage })(MessageError);
