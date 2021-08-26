import { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';

const Login = ({ isAuthenticated, login }) => {
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const emailInput = document.querySelector('#login-email');
	const passwordInput = document.querySelector('#login-password');

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
		<div
			className='fullscreen d-flex flex-column align-items-center justify-content-center'
			id='login'>
			<h1 className='title text-center mb-4'>Login</h1>
			<Form
				action='submit'
				onSubmit={(e) => {
					onSubmit(e);
				}}
				className='d-flex flex-column align-items-center justify-content-center'>
				<FormGroup className='mb-2'>
					<Input
						type='email'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						className='input'
						autoFocus
						id='login-email'
						placeholder='email'
						autoComplete='email'
					/>
					{email === '' && (
						<Label
							for='email'
							className='label'
							onClick={() => emailInput.focus()}>
							email
						</Label>
					)}
				</FormGroup>
				<FormGroup className='mb-4'>
					<Input
						type='password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						className='input'
						id='login-password'
						autoComplete='current-password'
					/>
					{password === '' && (
						<Label
							for='password'
							className='label'
							onClick={() => passwordInput.focus()}>
							password
						</Label>
					)}
				</FormGroup>
				<Input type='submit' value='Login' className='btn btn-3 mb-3' />
			</Form>
			<Link to='/register' className='btn btn-4'>
				New User?
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
