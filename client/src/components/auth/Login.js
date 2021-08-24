import { useState } from 'react';
import { Container, Form, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';

const Login = ({ isAuthenticated, login }) => {
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = data;

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		login(email, password);
	};

	if (isAuthenticated) {
		return <Redirect to='/chats' />;
	}

	return (
		<Container>
			<h1 className='text-center my-2'>Login</h1>
			<Form
				action='submit'
				onSubmit={(e) => {
					onSubmit(e);
				}}
				className='d-flex flex-column mt-4'>
				<Input
					type='email'
					name='email'
					value={email}
					onChange={(e) => onChange(e)}
					className='my-1'
				/>
				<Input
					type='password'
					name='password'
					value={password}
					onChange={(e) => onChange(e)}
					className='my-1'
				/>
				<Input type='submit' value='Login' className='btn btn-3 mt-2' />
			</Form>
			<Link to='/register' className='btn btn-4 my-2'>
				New User?
			</Link>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
