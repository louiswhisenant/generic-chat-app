import { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Button,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Navbar,
	NavbarBrand,
	Spinner,
} from 'reactstrap';
import { setAlert } from '../../../../redux/actions/alert';
import { editChat, getChatParticipants } from '../../../../redux/actions/chat';
import Contact from '../../../contacts/Contact';
import DeleteChat from './DeleteChat';

const ChatSettings = ({
	chat: { chat, participants, loading },
	editChat,
	getChatParticipants,
	setAlert,
}) => {
	const [name, setName] = useState(``);

	const onChange = (e) => {
		setName(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (name) {
			editChat(chat._id, { name });
		} else {
			setAlert('Name is empty', 'danger');
		}

		setName('');
	};

	useEffect(() => {
		if (chat) {
			const { participants } = chat;

			getChatParticipants(chat._id, { participants });
		}
	}, [getChatParticipants, chat]);

	const nav = (
		<Navbar dark className='fixed-top' id='chat-nav'>
			{!loading && (
				<Fragment>
					<Link to={`/chats/${chat._id}`} className='back-to-chats'>
						<i className='fas fa-arrow-left'></i>
					</Link>
					<NavbarBrand>{chat.name} Settings</NavbarBrand>
				</Fragment>
			)}
		</Navbar>
	);

	return (
		<Fragment>
			{nav}
			{!loading && (
				<Container id='chat-settings'>
					<div className='chat-name'>
						<h2 className='title color-3 chat-name-title'>
							Change Chat Name
						</h2>
						<Form
							action='submit'
							onSubmit={(e) => onSubmit(e)}
							className='change-chat-name'>
							<FormGroup className='mb-2'>
								<Input
									type='text'
									name='change-name'
									value={name}
									onChange={(e) => onChange(e)}
									className='input'
									id='login-account'
									placeholder='email or username'
									autoComplete='off'
								/>
								{name === '' && (
									<Label for='change-name' className='label'>
										{chat.name ? chat.name : 'Add Name'}
									</Label>
								)}
							</FormGroup>
							<Button
								type='submit'
								className='btn-3 change-chat-name-btn'>
								Save
							</Button>
						</Form>
					</div>

					<div className='chat-participants'>
						<h2 className='title color-4 chat-participants-title'>
							Manage Participants
						</h2>
						{participants && !loading && participants.length > 0 ? (
							participants.map((p) => (
								<div
									key={p.user._id}
									className='participant-card'>
									<Contact contact={p} />
								</div>
							))
						) : (
							<Spinner />
						)}
					</div>

					<DeleteChat />
				</Container>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	chat: state.chat,
});

export default connect(mapStateToProps, {
	editChat,
	getChatParticipants,
	setAlert,
})(ChatSettings);
