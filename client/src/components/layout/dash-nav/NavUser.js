import React from 'react';
import { connect } from 'react-redux';
import { NavItem } from 'reactstrap';

const NavUser = ({ auth: { user, loading } }) => {
	return (
		!loading && (
			<NavItem
				className='d-flex flex-column align-items-start'
				id='nav-user'>
				<div>{user.username}</div>
				<div>{user.email}</div>
			</NavItem>
		)
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(NavUser);
