import { connect } from 'react-redux';

const NavUser = ({
	user: { username, email },
	profile: {
		name: { first, last },
		bio,
		status,
	},
}) => {
	return (
		<div className='nav-user' id='nav-user'>
			<div className='nav-user-header'>
				<h5 className='new-user-title'>
					{first} {last && last}
				</h5>
				<i
					className={`fas fa-circle status-dot
					${status === 'online' ? 'color-green' : ''} 
					${status === 'hidden' ? 'color-1' : ''} 
					${status === 'offline' ? 'color-1' : ''}
					`}></i>
			</div>

			<div className='nav-user-info'>
				<small className='nav-user-bio'>{bio}</small>
				<p className='nav-user-user'>{username}</p>
				<p className='nav-user-email'>{email}</p>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	profile: state.profile.profile,
});

export default connect(mapStateToProps, null)(NavUser);
