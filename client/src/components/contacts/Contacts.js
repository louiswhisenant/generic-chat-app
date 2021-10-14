import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import NewContact from './NewContact';
import { getContactProfiles } from '../../redux/actions/profile';
import { Spinner } from 'reactstrap';
import Contact from './Contact';
import ContactActions from './ContactActions';

const Contacts = ({
	profile: {
		profile: { blocklist },
		profiles,
		profilesLoading,
	},
	getContactProfiles,
}) => {
	const [page2, setPage2] = useState(false);
	const [collapse, setCollapse] = useState(null);

	const onCollapse = (id) => {
		collapse === id ? setCollapse(null) : setCollapse(id);
	};

	const mapContacts = (profiles) => {
		return profiles
			.sort((a, b) => a.name.first.localeCompare(b.name.first))
			.map((profile) => (
				<div
					className='contact-card'
					onClick={() => {
						onCollapse(profile.user._id);
					}}>
					<Contact contact={profile} />
					{collapse === profile.user._id && (
						<ContactActions profile={profile} />
					)}
				</div>
			));
	};

	const contactsTab = (
		<button
			onClick={() => {
				setPage2(false);
			}}
			className={`btn-basic btn-secondary contacts-tab tab-contacts ${
				!page2 ? 'current' : ''
			}`}>
			<i className='fas fa-users'></i> Contacts
		</button>
	);

	const blockedTab = (
		<button
			onClick={() => {
				setPage2(true);
			}}
			className={`btn-basic btn-secondary contacts-tab tab-blocklist ${
				page2 ? 'current' : ''
			}`}>
			<i className='fas fa-ban'></i> Blocked
		</button>
	);

	useEffect(() => {
		getContactProfiles();
		// eslint-disable-next-line
	}, []);

	return (
		<div id='contacts'>
			<div className='contacts-tabs'>
				{contactsTab}
				{blockedTab}
			</div>

			<div className={`contacts-page ${page2 ? 'page-2' : 'page-1'}`}>
				{profilesLoading ? (
					<Spinner />
				) : !page2 ? (
					<div id='contacts-contacts'>
						{profiles.length > 0 ? (
							mapContacts(profiles)
						) : (
							<div className='contact-card'>
								You have no contacts.
							</div>
						)}
					</div>
				) : (
					<div id='contacts-blocklisted'>
						{blocklist.length > 0 ? (
							blocklist.map((blocked) => (
								<div className='contact-card' key={blocked}>
									<h3 className='contact-card-name'>
										{blocked}
									</h3>
									<p className='contact-card-id'>{blocked}</p>
								</div>
							))
						) : (
							<div className='contact-card'>
								You have no blocked contacts.
							</div>
						)}
					</div>
				)}
			</div>

			{!page2 && <NewContact />}
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	chat: state.chat,
	user: state.auth.user,
});

export default connect(mapStateToProps, { getContactProfiles })(Contacts);
