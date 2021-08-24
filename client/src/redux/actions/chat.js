import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_CHAT,
	GET_CHATS,
	CHAT_ERROR,
	DELETE_CHAT,
	CREATE_CHAT,
} from './types';

// Get chat
export const getChat = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/chats/${id}`);

		dispatch({
			type: GET_CHAT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CHAT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get all user chats
export const getChats = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/chats');

		dispatch({
			type: GET_CHATS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CHAT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete chat
export const deleteChat = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/chats/${id}`);

		dispatch({
			type: DELETE_CHAT,
			payload: id,
		});

		dispatch(setAlert('Post removed', 'success'));
	} catch (err) {
		dispatch({
			type: CHAT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Create chat
export const createChat = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(`/api/chats`, formData, config);

		dispatch({
			type: CREATE_CHAT,
			payload: res.data,
		});

		dispatch(setAlert('Chat created', 'success'));
	} catch (err) {
		dispatch({
			type: CHAT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
