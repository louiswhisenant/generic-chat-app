import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div>
			Welcome to generic-chat-app!
			<Link to='/login' className='btn btn-3'>
				Login
			</Link>
			<Link to='/register' className='btn btn-4'>
				Register
			</Link>
		</div>
	);
};

export default Landing;
