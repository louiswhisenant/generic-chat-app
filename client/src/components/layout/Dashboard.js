import React from 'react';
import { Button } from 'reactstrap';
import Chats from '../chats/Chats';

const Dashboard = () => {
	return (
		<div className='fullscreen'>
			<Chats />
			<Button className='btn btn-3 btn-circle'>
				<i className='fas fa-pen bg-transparent'></i>
			</Button>
		</div>
	);
};

export default Dashboard;
