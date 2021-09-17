import { connect } from 'react-redux';
import { useState } from 'react';

const Contacts = ({ profile: { blocklist, contacts } }) => {
	const [page2, setPage2] = useState(false);

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
				{!page2 ? (
					<div id='contacts-contacts'>
						{contacts.length > 0 ? (
							contacts.map((contact) => (
								<div className='contact-card' key={contact.id}>
									<h3 className='contact-card-name'>
										{contact.nickname}
									</h3>
									<p className='contact-card-id'>
										{contact.id}
									</p>
								</div>
							))
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
								You have no blocked users.
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});

export default connect(mapStateToProps, null)(Contacts);
