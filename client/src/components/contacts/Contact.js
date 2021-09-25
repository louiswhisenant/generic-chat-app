import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Contact = ({
	contact: {
		user: { _id },
		name,
		bio,
	},
	profile: { contacts },
}) => {
	const [nickname, setNickname] = useState(null);

	useEffect(() => {
		const hasNickname = contacts.filter((contact) => contact.id === _id);

		if (hasNickname.length === 1) {
			setNickname(hasNickname[0].nickname);
		}
	}, [_id, contacts]);

	return (
		<div className='contact'>
			<div className='contact-avatar'>
				{name.first.charAt(0).toUpperCase()}
			</div>
			<div className='contact-info'>
				<h5 className='title color-3 contact-user'>{_id}</h5>
				{nickname && (
					<h5 className='title color-3 contact-nickname'>
						{nickname}
					</h5>
				)}
				<h6 className='contact-name title color-4'>
					{name.first} {name.last && name.last}
				</h6>
				<small className='contact-bio'>{bio}</small>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});

export default connect(mapStateToProps, null)(Contact);
