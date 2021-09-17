import { useState } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { updateProfile } from '../../redux/actions/profile';
import { useHistory } from 'react-router';

const Settings = ({
	profile: {
		name: { first, last },
		bio,
	},
	updateProfile,
}) => {
	const [data, setData] = useState({
		firstName: first ? first : '',
		lastName: last ? last : '',
		biography: bio ? bio : '',
	});

	const history = useHistory();

	const { firstName, lastName, biography } = data;

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

		if (lastName) {
			profile.name.last = lastName;
		}
		if (biography) {
			profile.bio = biography;
		}

		updateProfile(profile, history, true);
	};

	return (
		<div id='settings'>
			<h2 className='title color-3 settings-profile-title text-center my-2'>
				Profile
			</h2>
			<Form
				action='submit'
				onSubmit={(e) => {
					onSubmit(e);
				}}
				className='d-flex flex-column justify-content-center'>
				<h4 className='title color-4 settings-name-title'>
					Change Name
				</h4>
				<FormGroup className='mb-2'>
					<Input
						type='text'
						name='firstName'
						value={firstName}
						onChange={(e) => onChange(e)}
						className='input'
						autoFocus
						id='settings-firstName'
						placeholder='First Name'
						autoComplete='off'
					/>
					{firstName === '' && (
						<Label for='firstName' className='label'>
							First name
						</Label>
					)}
				</FormGroup>
				<FormGroup className='mb-4'>
					<Input
						type='text'
						name='lastName'
						value={lastName}
						onChange={(e) => onChange(e)}
						className='input'
						id='settings-lastName'
						placeholder='Last Name'
						autoComplete='off'
					/>
					{lastName === '' && (
						<Label for='lastName' className='label'>
							Last name
						</Label>
					)}
				</FormGroup>
				<h4 className='title color-4 settings-bio-title'>Biography</h4>
				<FormGroup className='mb-4'>
					<textarea
						type='text'
						name='biography'
						value={biography}
						onChange={(e) => onChange(e)}
						className='input'
						id='settings-biography'
						placeholder='Bio'
						autoComplete='off'></textarea>
					{biography === '' && (
						<Label for='biography' className='label'>
							Bio
						</Label>
					)}
				</FormGroup>
				<Input type='submit' value='Save' className='btn btn-3 mb-3' />
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});

export default connect(mapStateToProps, { updateProfile })(Settings);
