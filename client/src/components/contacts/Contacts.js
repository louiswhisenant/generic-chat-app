import { connect } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import NewContact from './NewContact';
import { createChat } from '../../redux/actions/chat';
import { getContactProfiles, removeContact } from '../../redux/actions/profile';
import { Spinner } from 'reactstrap';
import Contact from './Contact';
import { useHistory } from 'react-router';

const Contacts = ({
	profile: {
		profile: { blocklist, contacts },
		profiles,
		loading,
	},
	chat: { chat, chats },
	user,
	createChat,
	getContactProfiles,
	removeContact,
}) => {
	const history = useHistory();

	const [page2, setPage2] = useState(false);
	const [collapse, setCollapse] = useState(null);

	const onCollapse = (id) => {
		collapse === id ? setCollapse(null) : setCollapse(id);
	};

	const goToChat = (id) => {
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

			history.push(`/chats/${chat}`);
		}
	};

	useEffect(() => {
		getContactProfiles();
	}, [getContactProfiles]);

	return (
		<div id='contacts'>
			<div className='contacts-tabs'>
				<button
					onClick={() => {
						setPage2(false);
					}}
					className={`btn-basic btn-secondary contacts-tab tab-contacts ${
						!page2 ? 'current' : ''
					}`}>
					<i className='fas fa-users'></i> Contacts
				</button>
				<button
					onClick={() => {
						setPage2(true);
					}}
					className={`btn-basic btn-secondary contacts-tab tab-blocklist ${
						page2 ? 'current' : ''
					}`}>
					<i className='fas fa-ban'></i> Blocked
				</button>
			</div>

			<div className={`contacts-page ${page2 ? 'page-2' : 'page-1'}`}>
				{profiles.length > 0 && !loading ? (
					<Fragment>
						{!page2 ? (
							<div id='contacts-contacts'>
								{profiles
									.sort((a, b) =>
										a.name.first.localeCompare(b.name.first)
									)
									.map((profile) => (
										<div
											className='contact-card'
											onClick={() => {
												onCollapse(profile.user._id);
											}}>
											<Contact contact={profile} />
											{collapse === profile.user._id && (
												<div className='contact-actions'>
													<button className='btn btn-4'>
														<i className='fas fa-search'></i>
													</button>
													<button
														className='btn btn-3'
														onClick={() => {
															goToChat(
																profile.user._id
															);
														}}>
														<i className='fas fa-comment-alt'></i>
													</button>
													<button
														className='btn btn-red'
														onClick={() => {
															removeContact({
																id: profile.user
																	._id,
															});
														}}>
														<i className='fas fa-user-minus'></i>
													</button>
												</div>
											)}
										</div>
									))}
							</div>
						) : (
							<div id='contacts-blocklisted'>
								{blocklist.length > 0 ? (
									blocklist.map((blocked) => (
										<div
											className='contact-card'
											key={blocked}>
											<h3 className='contact-card-name'>
												{blocked}
											</h3>
											<p className='contact-card-id'>
												{blocked}
											</p>
										</div>
									))
								) : (
									<div className='contact-card'>
										You have no blocked users.
									</div>
								)}
							</div>
						)}
					</Fragment>
				) : (
					<Spinner />
				)}
			</div>

			<NewContact />
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	chat: state.chat,
	user: state.auth.user,
});

export default connect(mapStateToProps, {
	createChat,
	getContactProfiles,
	removeContact,
})(Contacts);
