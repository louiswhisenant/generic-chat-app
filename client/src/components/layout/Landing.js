import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
	const name = Array.from('generic-chat-app');

	if (isAuthenticated) {
		return <Redirect to='/chats' />;
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
});

export default connect(mapStateToProps, null)(Landing);
