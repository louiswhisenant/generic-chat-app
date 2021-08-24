import React from 'react';
import { Button } from 'reactstrap';
import Chats from '../chats/Chats';

const Dashboard = () => {
	return (
		<div>
			<Chats />
			<Button className='btn-3'>
				<i className='fas fa-pen-square'></i>
			</Button>
		</div>
	);
};

export default Dashboard;
