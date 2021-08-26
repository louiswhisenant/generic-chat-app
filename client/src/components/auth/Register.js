import { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { setAlert } from '../../redux/actions/alert';

const Register = ({ isAuthenticated, register, setAlert }) => {
	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});
	const usernameInput = document.querySelector('#register-username');
	const emailInput = document.querySelector('#register-email');
	const passwordInput = document.querySelector('#register-password');
	const password2Input = document.querySelector('#register-password-2');

	const { username, email, password, password2 } = data;

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			setAlert('Passwords must match', 'danger');
		} else {
			register({ username, email, password });
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/chats' />;
	}

	return (
		<div
			className='fullscreen d-flex flex-column align-items-center justify-content-center'
			id='login'>
			<h1 className='title text-center mb-4'>Register</h1>
			<Form
				action='submit'
				onSubmit={(e) => {
					onSubmit(e);
				}}
				className='d-flex flex-column align-items-center justify-content-center'>
				<FormGroup className='mb-2'>
					<Input
						type='username'
						name='username'
						value={username}
						onChange={(e) => onChange(e)}
						className='input'
						autoFocus
						id='register-username'
						placeholder='username'
						autoComplete='username'
					/>
					{username === '' && (
						<Label
							for='username'
							className='label'
							onClick={() => usernameInput.focus()}>
							username
						</Label>
					)}
				</FormGroup>
				<FormGroup className='mb-2'>
					<Input
						type='email'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						className='input'
						id='register-email'
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
				<FormGroup className='mb-2'>
					<Input
						type='password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						className='input'
						id='register-password'
						autoComplete='new-password'
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
				<FormGroup className='mb-4'>
					<Input
						type='password'
						name='password2'
						value={password2}
						onChange={(e) => onChange(e)}
						className='input'
						id='register-password-2'
						autoComplete='new-password'
					/>
					{password === '' && (
						<Label
							for='password2'
							className='label'
							onClick={() => password2Input.focus()}>
							retype password
						</Label>
					)}
				</FormGroup>
				<Input
					type='submit'
					value='Register'
					className='btn btn-3 mb-3'
				/>
			</Form>
			<Link to='/login' className='btn btn-4'>
				Existing User?
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
