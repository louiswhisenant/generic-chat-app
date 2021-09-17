import React from 'react';
import { connect } from 'react-redux';
import { NavItem } from 'reactstrap';

const NavUser = ({
	user: { username, email },
	profile: {
		name: { first, last },
		bio,
		status,
	},
}) => {
	return (
		<NavItem className='nav-user' id='nav-user'>
			<div className='status-dot'>
				<i
					className={`fas fa-circle
					${status === 'online' ? 'color-green' : ''} 
					${status === 'hidden' ? 'color-1' : ''} 
					${status === 'offline' ? 'color-1' : ''}
					`}></i>
			</div>
			<h5>
				{first}
				{last && last}
			</h5>
			<small>{bio}</small>
			<p className='nav-user-user'>{username}</p>
			<p className='nav-user-email'>{email}</p>
		</NavItem>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	profile: state.profile.profile,
});

export default connect(mapStateToProps, null)(NavUser);
