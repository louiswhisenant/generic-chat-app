import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import { createMessage } from '../../../../redux/actions/message';
import { connect } from 'react-redux';

const NewMessage = ({ chat, createMessage }) => {
	const [message, setMessage] = useState('');
	const messageInput = document.querySelector('#message-input');

	const onChange = (e) => {
		setMessage(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		await createMessage(message, chat);
		setMessage('');
		messageInput.focus();
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
							value={message}
							onChange={(e) => onChange(e)}
							className='input'
							autoFocus
							id='message-input'
							autoComplete='off'
						/>
						<InputGroupAddon addonType='append'>
							<Button type='submit' className='message-send'>
								<i className='fas fa-paper-plane'></i>
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</FormGroup>
			</Form>
		</div>
	);
};

export default connect(null, { createMessage })(NewMessage);
