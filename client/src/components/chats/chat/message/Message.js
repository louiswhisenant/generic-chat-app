import { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
	deselectMessage,
	selectMessage,
} from '../../../../redux/actions/message';

const Message = ({
	text,
	createdAt,
	updatedAt,
	status,
	author,
	auth: { user, loading },
	id,
	selected,
	selectMessage,
	deselectMessage,
}) => {
	const onClick = ({ id, author }) => {
		selected.find((obj) => obj.id === id)
			? deselectMessage(id)
			: selectMessage({ id, author });
	};

	return (
		!loading && (
			<div
				className={`message ${
					author === user._id ? 'user-true' : 'user-false'
				} ${
					selected.find((obj) => obj.id === id)
						? 'message-selected'
						: ''
				}`}
				onClick={() => {
					onClick({ id, author });
				}}>
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
		)
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	selected: state.message.selected,
});

export default connect(mapStateToProps, { selectMessage, deselectMessage })(
	Message
);
