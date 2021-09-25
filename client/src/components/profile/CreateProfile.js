import { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../redux/actions/profile';

const CreateProfile = ({ profile, createProfile }) => {
	const [data, setData] = useState({
		first: '',
		last: '',
		bio: '',
	});

	const history = useHistory();

	const { first, last, bio } = data;

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const profile = {
			name: {
				first,
			},
		};

		if (last) {
			profile.name.last = last;
		}
		if (bio) {
			profile.bio = bio;
		}

		createProfile(profile, history);
	};

	if (profile) {
		return <Redirect to='/dash' />;
	}

	return (
		<div
			className='fullscreen d-flex flex-column align-items-center justify-content-center'
			id='create-profile'>
			<h1 className='title text-center mb-4'>Create a Profile</h1>
			<Form
				action='submit'
				onSubmit={(e) => {
					onSubmit(e);
				}}
				className='d-flex flex-column align-items-center justify-content-center'>
				<FormGroup className='mb-2'>
					<Input
						type='text'
						name='first'
						value={first}
						onChange={(e) => onChange(e)}
						className='input'
						autoFocus
						id='create-profile-name-first'
						placeholder='First'
						autoComplete='off'
					/>
					{first === '' && (
						<Label for='first' className='label'>
							First*
						</Label>
					)}
				</FormGroup>
				<FormGroup className='mb-2'>
					<Input
						type='text'
						name='last'
						value={last}
						onChange={(e) => onChange(e)}
						className='input'
						autoFocus
						id='create-profile-name-last'
						placeholder='Last'
						autoComplete='off'
					/>
					{last === '' && (
						<Label for='last' className='label'>
							Last
						</Label>
					)}
				</FormGroup>
				<FormGroup>
					<Input
						type='text'
						name='bio'
						value={bio}
						onChange={(e) => onChange(e)}
						className='input'
						id='create-profile-bio'
						autoComplete='off'
					/>
					{bio === '' && (
						<Label for='bio' className='label'>
							Bio
						</Label>
					)}
				</FormGroup>
				<small className='value-required mt-1 mb-4'>*required</small>
				<Input type='submit' value='Save' className='btn btn-3 mb-3' />
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});

export default connect(mapStateToProps, { createProfile })(CreateProfile);
