import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import chat from './chat';
import message from './message';

export default combineReducers({
	alert,
	auth,
	profile,
	chat,
	message,
});
