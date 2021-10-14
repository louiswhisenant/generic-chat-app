import { useState, useRef, useEffect, Fragment } from 'react';
import { Button, Spinner } from 'reactstrap';
import Contact from '../../contacts/Contact';
import { connect } from 'react-redux';
import { createChat } from '../../../redux/actions/chat';
import { getContactProfiles } from '../../../redux/actions/profile';
import { useHistory } from 'react-router';

const NewChat = ({
	profile: { profiles, loading, profilesLoading },
	chats,
	user,
	createChat,
	getContactProfiles,
}) => {
	const [modal, setModal] = useState(false);
	const modalRef = useRef(null);
	const history = useHistory();

	const toggle = () => setModal(!modal);

	const createNewChat = (id) => {
		let isChat;

		// Look for an already existing chat that matches participants...
		chats.forEach((chat) => {
			const check = chat.participants.filter(
				(p) => p.id === user._id || p.id === id
			);

			if (check.length === 2) {
				isChat = chat._id;
			} else {
				return;
			}
		});

		// ...if it exists, push to that chat, else create
		if (isChat) {
			history.push(`/chats/${isChat}`);
		} else {
			const data = {
				invites: [
					{
						id,
						role: 'admin',
					},
				],
			};

			createChat(data);
		}

		setModal(false);
	};

	const mapContacts = (profiles) => {
		return profiles
			.sort((a, b) => a.name.first.localeCompare(b.name.first))
			.map((profile) => (
				<Fragment>
					<div
						className='contact-card'
						onClick={() => createNewChat(profile.id)}>
						<Contact contact={profile} />
					</div>
					<hr />
				</Fragment>
			));
	};

	const clickListener = (e) => {
		if (modalRef.current && modalRef.current.contains(e.target)) {
			return;
		}

		setModal(false);
	};

	useEffect(() => {
		document.addEventListener('click', clickListener);
		return () => {
			document.removeEventListener('click', clickListener);
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getContactProfiles();
		// eslint-disable-next-line
	}, []);

	return (
		!loading && (
			<div id='new-chat' ref={modalRef}>
				<Button
					className='btn btn-4-solid btn-circle'
					id='new-chat-btn'
					onClick={toggle}>
					<i className='fas fa-pen bg-transparent'></i>
				</Button>

				{modal && (
					<div id='new-chat-modal'>
						<div className='new-chat-modal-header'>
							<h2 className='new-chat-modal-title'>New Chat</h2>
							<button
								className='new-chat-modal-close'
								onClick={toggle}>
								<i className='fas fa-times'></i>
							</button>
						</div>
						<hr className='header-line' />
						<div className='new-chat-modal-body'>
							{profilesLoading ? (
								<Spinner />
							) : profiles.length > 0 ? (
								mapContacts(profiles)
							) : (
								<div className='no-contacts'>
									No contacts to show.
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	chats: state.chat.chats,
	user: state.auth.user,
});

export default connect(mapStateToProps, { createChat, getContactProfiles })(
	NewChat
);
