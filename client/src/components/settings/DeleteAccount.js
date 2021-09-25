import { useState } from 'react';
import { deleteAccount } from '../../redux/actions/profile';
import { connect } from 'react-redux';

const DeleteAccount = ({ deleteAccount }) => {
	const [modal, setModal] = useState(false);

	const onClick = (e) => {
		e.preventDefault();

		deleteAccount();
	};

	return (
		<div id='delete-account'>
			<button
				className='btn btn-red delete-account-trigger'
				onClick={(e) => {
					setModal(true);
				}}>
				Delete Account
			</button>

			{modal && (
				<div className='delete-account-modal'>
					<h2 className='delete-acount-title color-red title'>
						Attention
					</h2>
					<p className='delete-account-prompt'>
						This will permanently delete your account and all of
						your chats. This action cannot be undone. Are you sure
						you wish to proceed?
					</p>

					<div className='delete-account-actions'>
						<button
							onClick={(e) => {
								onClick(e);
							}}
							className='delete-account-confirm-btn btn btn-red'>
							Confirm
						</button>
						<button
							onClick={() => {
								setModal(false);
							}}
							className='delete-account-cancel-btn btn btn-secondary'>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default connect(null, { deleteAccount })(DeleteAccount);
