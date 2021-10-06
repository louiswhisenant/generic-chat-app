import { useEffect, useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
	clearProfileSearch,
	getProfileBySearch,
	addContact,
} from '../../redux/actions/profile';
import Contact from './Contact';

const NewContact = ({
	profile: { profile, search },
	getProfileBySearch,
	clearProfileSearch,
	addContact,
}) => {
	const [modal, setModal] = useState(false);
	const [formData, setFormData] = useState('');

	const onChange = (e) => {
		setFormData(e.target.value);

		if (search) {
			clearProfileSearch();
		}
	};

	const onSearch = (e) => {
		e.preventDefault();

		getProfileBySearch(formData);
	};

	const onClose = () => {
		setModal(false);
	};

	const onAdd = (e) => {
		e.preventDefault();

		// const profileData = profile;

		const newContact = {
			contact: {
				nickname: `${search.name.first} ${
					search.name.last && search.name.last
				}`,
				id: search.user,
			},
		};

		addContact({ newContact, search });
		setModal(false);
		clearProfileSearch();
	};

	const onCancel = (e) => {
		e.preventDefault();

		setFormData('');
		clearProfileSearch();
	};

	useEffect(() => {
		!modal && setFormData('');
		clearProfileSearch();
	}, [modal]);

	return (
		<div id='new-contact'>
			<button
				className='new-contact-modal-trigger btn btn-circle'
				onClick={() => {
					setModal(!modal);
				}}>
				<i className='fas fa-user-plus'></i>
			</button>

			{modal && (
				<div className='new-contact-modal'>
					<div className='new-contact-modal-header'>
						<h5 className='new-contact-title title color-4'>
							Add Contact
						</h5>
						<i
							className='fas fa-times new-contact-modal-close'
							onClick={onClose}></i>
					</div>
					<hr />
					<p className='new-contact-modal-text'>
						Type the username of the contact you want to add.
					</p>

					<Form
						onSubmit={(e) => {
							onSearch(e);
						}}>
						<FormGroup>
							<InputGroup>
								<Input
									type='text'
									className='input new-contact-modal-input'
									value={formData}
									onChange={(e) => {
										onChange(e);
									}}
								/>
								<InputGroupAddon addonType='append'>
									<Button
										type='submit'
										className='input-group-addon new-contact-submit'>
										<i className='fas fa-search'></i>
									</Button>
								</InputGroupAddon>
							</InputGroup>
						</FormGroup>
					</Form>

					{search && (
						<div className='new-contact-modal-results'>
							<hr />
							<Contact contact={search} />
							<div className='contact-actions'>
								<Button
									className='contact-action-btn contact-actions-add btn btn-3'
									onClick={(e) => {
										onAdd(e);
									}}>
									Add
								</Button>
								<Button
									className='contact-action-btn contact-actions-cancel btn btn-secondary'
									onClick={(e) => {
										onCancel(e);
									}}>
									Cancel
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, {
	getProfileBySearch,
	clearProfileSearch,
	addContact,
})(NewContact);
