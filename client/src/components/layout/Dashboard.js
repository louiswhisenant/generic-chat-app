import { useEffect } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile';
import NewChat from '../chats/chat/NewChat';
import Chats from '../chats/Chats';
import DashNav from './dash-nav/DashNav';

const Dashboard = ({ getCurrentProfile }) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return (
		<div className='fullscreen' id='dashboard'>
			<DashNav />
			<Container className='mt-5'>
				<Chats />
				<NewChat />
			</Container>
		</div>
	);
};

export default connect(null, { getCurrentProfile })(Dashboard);
