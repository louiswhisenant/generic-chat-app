import { Fragment, useEffect } from 'react';

// Routing
import Routes from './components/routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';

// components
import Landing from './components/layout/Landing';

// utils
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import { getCurrentProfile } from './redux/actions/profile';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {

	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(getCurrentProfile());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					{/* <EXAMPLE /> */}
					<Switch>
            			<Route exact path='/' component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;