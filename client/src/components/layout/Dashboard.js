import { Container, Spinner } from 'reactstrap';
import Chats from '../chats/Chats';
import DashNav from './dash-nav/DashNav';
import { Switch, useRouteMatch } from 'react-router';
import PrivateRoute from '../routing/PrivateRoute';
import Contacts from '../contacts/Contacts';
import Settings from '../settings/Settings';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ profile: { profile, loading } }) => {
	let { path, url } = useRouteMatch();

	if (!profile && !loading) {
		return <Redirect to='/create-profile' />;
	}

	return loading ? (
		<Spinner />
	) : (
		<div className='' id='dashboard'>
			<DashNav path={path} url={url} />

			<Switch>
				<Container className='dashboard-container'>
					<PrivateRoute
						path={`${path}/contacts`}
						component={Contacts}
					/>
					<PrivateRoute
						path={`${path}/settings`}
						component={Settings}
					/>
					<PrivateRoute exact path={path} component={Chats} />
				</Container>
			</Switch>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, null)(Dashboard);
