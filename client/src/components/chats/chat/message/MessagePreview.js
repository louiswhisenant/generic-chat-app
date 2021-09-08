import { connect } from 'react-redux';
import { clearMessage } from '../../../../redux/actions/message';

const MessagePreview = ({ message: { text, type }, clearMessage }) => {
	const onCancel = () => {
		clearMessage();
	};

	return (
		<div id='message-preview'>
			<div className='message-preview-left'>
				<div className='message-preview-cancel' onClick={onCancel}>
					<i className='fas fa-times'></i>
				</div>
			</div>

			<div className='message-preview-right'>
				<div className='message-preview-info'>
					<div className='message-preview-icon'>
						{type === 'edit' && <i className='fas fa-pen'></i>}
						{type === 'reply' && <i className='fas fa-reply'></i>}
					</div>
					<div className='message-preview-info-title'>{type}</div>
				</div>

				<div className='message-preview-info-text'>{text}</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	message: state.message.message,
});

export default connect(mapStateToProps, { clearMessage })(MessagePreview);
