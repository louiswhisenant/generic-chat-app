import { useEffect, useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import {
	clearMessage,
	clearSelectedMessages,
	createMessage,
	editMessage,
} from '../../../../redux/actions/message';
import { connect } from 'react-redux';

const NewMessage = ({
	chat,
	message: { message, loading },
	user,
	createMessage,
	clearMessage,
	clearSelectedMessages,
	editMessage,
}) => {
	const [messageText, setMessageText] = useState('');
	const [expand, setExpand] = useState(false);

	const messageInput = document.querySelector('#message-input');

	useEffect(() => {
		if (!loading && message && message.type === 'edit') {
			setMessageText(message.text);
			messageInput.focus();
		} else if (!loading && message && message.type === 'reply') {
			messageInput.focus();
		} else {
			setMessageText('');
		}
	}, [loading, message, messageInput]);

	const onChange = (e) => {
		setMessageText(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (message) {
			if (message.type === 'edit') {
				await editMessage(message.chat, message._id, {
					text: messageText,
				});
			} else if (message.type === 'reply') {
				const reply = {
					text: message.text,
					id: message._id,
					author: message.author,
				};

				await createMessage(
					{ text: messageText, reply },
					chat,
					user._id
				);
			}

			clearMessage();
			clearSelectedMessages();
		} else {
			await createMessage({ text: messageText }, chat, user._id);
			setMessageText('');
			setExpand(false);
			messageInput.focus();
		}
	};

	return (
		<div id='message-new' className='fixed-bottom'>
			<Form
				action='submit'
				onSubmit={(e) => {
					onSubmit(e);
				}}
				className='d-flex align-items-center justify-content-center'>
				<FormGroup className='mb-2'>
					<InputGroup className='message-new-input-group'>
						<InputGroupAddon addonType='prepend'>
							<Button
								className='input-group-addon message-new-expand'
								onClick={() => {
									setExpand(true);
								}}>
								<i className='fas fa-expand'></i>
							</Button>
						</InputGroupAddon>
						<Input
							type='text'
							name='message'
							value={messageText}
							onChange={(e) => onChange(e)}
							className={`input message-input ${
								expand ? 'expanded' : ''
							}`}
							autoFocus
							id='message-input'
							autoComplete='off'
						/>
						<InputGroupAddon addonType='append'>
							<Button
								type='submit'
								className='input-group-addon message-new-submit'>
								{!loading &&
								message &&
								message.type === 'edit' ? (
									<i className='fas fa-check'></i>
								) : !loading &&
								  message &&
								  message.type === 'reply' ? (
									<i className='fas fa-reply'></i>
								) : (
									<i className='fas fa-paper-plane'></i>
								)}
							</Button>
						</InputGroupAddon>
						{expand && (
							<i
								className='fas fa-compress expanded-close'
								onClick={() => {
									setExpand(false);
								}}></i>
						)}
					</InputGroup>
				</FormGroup>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	message: state.message,
	user: state.auth.user,
});

export default connect(mapStateToProps, {
	createMessage,
	clearMessage,
	clearSelectedMessages,
	editMessage,
})(NewMessage);
