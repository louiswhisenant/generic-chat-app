import React from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../redux/actions/alert';

const Alert = ({ alerts, removeAlert }) => {
	const closeAlert = (id) => {
		console.log('closeAlert');
		removeAlert(id);
	};

	const success = <i className='fas fa-check-circle'></i>;

	const warning = <i className='fas fa-exclamation-circle'></i>;

	const danger = <i className='fas fa-times-circle'></i>;

	return (
		<div id='alert-anchor'>
			{alerts !== null &&
				alerts.length > 0 &&
				alerts.map((alert) => (
					<div
						key={alert.id}
						className={`alert alert-${alert.alertType}`}>
						<p className='alert-text'>
							{alert.alertType === 'success'
								? success
								: alert.alertType === 'warning'
								? warning
								: alert.alertType === 'danger' && danger}{' '}
							{alert.msg}
						</p>
						<button
							className='close-alert'
							onClick={() => closeAlert(alert.id)}>
							&times;
						</button>
					</div>
				))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
