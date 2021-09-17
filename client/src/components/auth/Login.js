import { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';

const Login = ({ isAuthenticated, profile: { profile, loading }, login }) => {
	const [data, setData] = useState({
		account: '',
		password: '',
	});

	const { account, password } = data;

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		login(account, password);
	};

	if (isAuthenticated) {
		if (!profile && !loading) {
			return <Redirect to='/create-profile' />;
		} else {
			return <Redirect to='/dash' />;
		}
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
						type='text'
						name='account'
						value={account}
						onChange={(e) => onChange(e)}
						className='input'
						autoFocus
						id='login-account'
						placeholder='email or username'
						autoComplete='off'
					/>
					{account === '' && (
						<Label for='account' className='label'>
							email/username
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
						<Label for='password' className='label'>
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
	profile: state.profile,
});

export default connect(mapStateToProps, { login })(Login);
