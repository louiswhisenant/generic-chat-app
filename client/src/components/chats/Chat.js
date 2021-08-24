import { useEffect } from 'react';
import { Spinner } from 'reactstrap';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getMessages } from '../../redux/actions/message';

const Chat = ({ match, message: { messages, loading }, user, getMessages }) => {
	useEffect(() => {
		getMessages(match.params.id);
	}, [getMessages, match]);

	return (
		<div>
			{!loading && messages.length > 0 ? (
				messages.map(
					({
						msg: _id,
						text,
						createdAt,
						updatedAt,
						status,
						author,
					}) => (
						<div
							className={`message ${
								author === user._id && 'message-user'
							}`}
							key={_id}>
							<small>
								<Moment
									format='hh:mm a'
									className='message-time'>
									{updatedAt}
								</Moment>
							</small>
							<p className='message-text'>{text}</p>
							{updatedAt !== createdAt && (
								<small className='message-edited'>Edited</small>
							)}
						</div>
					)
				)
			) : (
				<Spinner />
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	message: state.message,
	user: state.auth.user,
});

export default connect(mapStateToProps, { getMessages })(Chat);
