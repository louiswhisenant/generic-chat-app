import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_MESSAGE,
	GET_MESSAGES,
	MESSAGE_ERROR,
	DELETE_MESSAGE,
	CREATE_MESSAGE,
	EDIT_MESSAGE,
} from './types';

// Create message
export const createMessage = (formData, chat) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(`/api/chats/${chat}`, formData, config);

		dispatch({
			type: CREATE_MESSAGE,
			payload: res.data,
		});

		dispatch(setAlert('Message sent', 'success'));
	} catch (err) {
		dispatch({
			type: MESSAGE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get message
export const getMessage = (chat, message) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/messages/${chat}/${message}`);

		dispatch({
			type: GET_MESSAGE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: MESSAGE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get all chat message
export const getMessages = (chat) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/messages/${chat}`);

		dispatch({
			type: GET_MESSAGES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: MESSAGE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Edit message
export const editMessage = (chat, message, formData) => async (dispatch) => {
	try {
		await axios.put(`/api/chats/${chat}/${message}`);

		dispatch({
			type: EDIT_MESSAGE,
			payload: formData,
		});

		dispatch(setAlert('Message edited', 'success'));
	} catch (err) {
		dispatch({
			type: MESSAGE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete message
export const deleteMessage = (chat, message) => async (dispatch) => {
	try {
		await axios.delete(`/api/chats/${chat}/${message}`);

		dispatch({
			type: DELETE_MESSAGE,
			payload: message,
		});

		dispatch(setAlert('Message deleted', 'success'));
	} catch (err) {
		dispatch({
			type: MESSAGE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
