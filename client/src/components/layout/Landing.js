import { Link } from 'react-router-dom';

const Landing = () => {
	const name = Array.from('generic-chat-app');

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

export default Landing;
