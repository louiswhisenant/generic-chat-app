import { connect } from 'react-redux';

const Contacts = ({ profile: { name, status, bio, blocklist, contacts } }) => {
	return (
		<div>
			{contacts.map((contact) => (
				<div>
					<h3>{contact.nickname}</h3>
					<p>{contact.id}</p>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});

export default connect(mapStateToProps, null)(Contacts);
