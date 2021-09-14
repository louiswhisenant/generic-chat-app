import React, { useEffect, useState } from 'react';
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
	createMessage,
	clearMessage,
	clearSelectedMessages,
	editMessage,
}) => {
	const [messageText, setMessageText] = useState('');
	const messageInput = document.querySelector('#message-input');

	useEffect(() => {
		if (!loading && message && message.type === 'edit') {
			setMessageText(message.text);
			messageInput.focus();
		} else if (!loading && !message) {
			setMessageText('');
		}
	}, [loading, message, messageInput]);

	const onChange = (e) => {
		setMessageText(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (message && message.type === 'edit') {
			await editMessage(message.chat, message._id, messageText);
			clearMessage();
			clearSelectedMessages();
		} else {
			await createMessage(messageText, chat);
			setMessageText('');
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
					<InputGroup>
						<Input
							type='text'
							name='message'
							value={messageText}
							onChange={(e) => onChange(e)}
							className='input'
							autoFocus
							id='message-input'
							autoComplete='off'
						/>
						<InputGroupAddon addonType='append'>
							<Button type='submit' className='message-send'>
								{!loading &&
								message &&
								message.type === 'edit' ? (
									<i className='fas fa-check'></i>
								) : (
									<i className='fas fa-paper-plane'></i>
								)}
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</FormGroup>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	message: state.message,
});

export default connect(mapStateToProps, {
	createMessage,
	clearMessage,
	clearSelectedMessages,
	editMessage,
})(NewMessage);
