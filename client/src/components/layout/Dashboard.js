import { useEffect } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile';
import Chats from '../chats/Chats';
import DashNav from './dash-nav/DashNav';
import { Switch, useRouteMatch } from 'react-router';
import PrivateRoute from '../routing/PrivateRoute';
import Contacts from '../contacts/Contacts';
import Settings from './Settings';

const Dashboard = ({ getCurrentProfile }) => {
	let { path, url } = useRouteMatch();

	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return (
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

export default connect(null, { getCurrentProfile })(Dashboard);
