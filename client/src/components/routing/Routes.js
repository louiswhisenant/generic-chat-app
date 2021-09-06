import React from 'react';
import { Route, Switch } from 'react-router-dom';

// routing
import PrivateRoute from './PrivateRoute';

// Alert
import Alert from '../layout/Alert';

// Access
import Register from '../auth/Register';
import Login from '../auth/Login';

// Profile
import CreateProfile from '../profile/CreateProfile';
import EditProfile from '../profile/EditProfile';

// Contacts
import Contacts from '../contacts/Contacts';
import Contact from '../contacts/Contact';

// Chats
import Dashboard from '../layout/Dashboard';
import Chat from '../chats/chat/Chat';

// Not Found
import NotFound from '../layout/NotFound';

const Routes = () => {
	return (
		<section>
			<Alert />
			<Switch>
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<PrivateRoute
					exact
					path='/create-profile'
					component={CreateProfile}
				/>
				<PrivateRoute
					exact
					path='/edit-profile'
					component={EditProfile}
				/>

				<Route exact path='/contacts' component={Contacts} />
				<Route exact path='/contacts/:id' component={Contact} />

				<PrivateRoute exact path='/chats' component={Dashboard} />
				<PrivateRoute exact path='/chats/:id' component={Chat} />

				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
