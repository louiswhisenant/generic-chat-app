import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated, profile }) => {
	const name = Array.from('generic-chat-app');

	if (isAuthenticated) {
		if (!profile) {
			return <Redirect to='/create-profile' />;
		} else {
			return <Redirect to='/dash' />;
		}
	}

	return (
		<div
			className='fullscreen d-flex flex-column align-items-center justify-content-center'
			id='landing'>
			<div className='title'>{name.join('')}</div>
			<Link to='/login' className='btn btn-3 my-3'>
				Login
			</Link>
			<Link to='/register' className='btn btn-4 mt-1'>
				Register
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	profile: state.profile.profile,
});

export default connect(mapStateToProps, null)(Landing);
