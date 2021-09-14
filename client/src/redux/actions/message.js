import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_MESSAGE,
	GET_MESSAGES,
	MESSAGE_ERROR,
	DELETE_MESSAGE,
	CREATE_MESSAGE,
	EDIT_MESSAGE,
	SELECT_MESSAGE,
	DESELECT_MESSAGE,
	CLEAR_SELECTED,
	MESSAGE_RESET,
	CLEAR_MESSAGE,
} from './types';

// Create message
export const createMessage = (formData, chat) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(`/api/messages/${chat}`, formData, config);

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
		dispatch(setAlert('Something went wrong', 'danger'));
	}
};

// Get message
export const getMessage = (chat, message, type) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/messages/${chat}/${message}`);

		dispatch({
			type: GET_MESSAGE,
			payload: { ...res.data, type },
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
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.put(
			`/api/messages/${chat}/${message}`,
			{ text: formData },
			config
		);

		dispatch({
			type: EDIT_MESSAGE,
			payload: res.data,
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
export const deleteMessage = (chat, messages) => async (dispatch) => {
	try {
		await axios.delete(`/api/messages/${chat}`, {
			data: { selected: messages },
		});

		dispatch({
			type: DELETE_MESSAGE,
			payload: messages,
		});

		messages.length > 1
			? dispatch(
					setAlert(`${messages.length} messages deleted`, 'success')
			  )
			: dispatch(setAlert('Message deleted', 'success'));

		dispatch({ type: CLEAR_SELECTED });
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

// Select Message
export const selectMessage =
	({ id, author }) =>
	(dispatch) => {
		try {
			dispatch({
				type: SELECT_MESSAGE,
				payload: { id, author },
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

// Deselect Message
export const deselectMessage = (id) => (dispatch) => {
	try {
		dispatch({
			type: DESELECT_MESSAGE,
			payload: id,
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

// Clear selected
export const clearSelectedMessages = () => (dispatch) => {
	try {
		dispatch({
			type: CLEAR_SELECTED,
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

// Clear message
export const clearMessage = () => (dispatch) => {
	try {
		dispatch({
			type: CLEAR_MESSAGE,
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

// Clear message state
export const resetMessages = () => (dispatch) => {
	try {
		dispatch({
			type: MESSAGE_RESET,
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
