import { Fragment, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Button } from 'reactstrap';
import { deleteMessage } from '../../../../redux/actions/message';

const Message = ({
	text,
	createdAt,
	updatedAt,
	status,
	author,
	auth: { user, loading },
	chat,
	id,
	deleteMessage,
}) => {
	const [modal, setModal] = useState(false);
	const modalRef = useRef(null);

	const onDelete = () => {
		deleteMessage(chat, id);
	};

	return (
		!loading && (
			<Fragment>
				<div
					className={`message ${
						author === user._id ? 'user-true' : 'user-false'
					}`}
					onClick={() => setModal(!modal)}>
					<div className='message-info'>
						<Moment format='hh:mm a' className='message-info-time'>
							{updatedAt}
						</Moment>
						{updatedAt !== createdAt && (
							<span className='message-info-edited'>edited</span>
						)}
						<div className='message-info-status-anchor'>
							{status === 'sent' ? (
								<i className='fas fa-check message-info-status status-sent'></i>
							) : status === 'delivered' ? (
								<Fragment>
									<i className='fas fa-check message-info-status status-delivered'></i>{' '}
									<i className='fas fa-check message-info-status status-delivered'></i>
								</Fragment>
							) : status === 'read' ? (
								<Fragment>
									<i className='fas fa-check message-info-status status-read'></i>{' '}
									<i className='fas fa-check message-info-status status-read'></i>
								</Fragment>
							) : status === 'error' ? (
								<i className='fas fa-exclamation-triangle message-info-status status-error'></i>
							) : (
								''
							)}
						</div>
					</div>

					<p className='message-text'>{text}</p>
				</div>

				{modal && (
					<div className='message-context-modal'>
						<i className='fas fa-pen'></i>
						<i className='fas fa-copy'></i>
						<i className='fas fa-trash' onClick={onDelete}></i>
					</div>
				)}
			</Fragment>
		)
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteMessage })(Message);
