import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_CHAT,
	GET_CHAT_BOOKMARKS,
	GET_CHAT_PARTICIPANTS,
	GET_CHATS,
	CHAT_ERROR,
	DELETE_CHAT,
	CREATE_CHAT,
	CLEAR_CHAT,
	EDIT_CHAT,
	EDIT_BOOKMARKS,
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

// Get chat bookmarks
export const getBookmarks = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/chats/${id}/bookmarks`);

		dispatch({
			type: GET_CHAT_BOOKMARKS,
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

// Get chat
export const getChatParticipants = (id, participants) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(
			`/api/profiles/chat/${id}`,
			participants,
			config
		);

		dispatch({
			type: GET_CHAT_PARTICIPANTS,
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

		dispatch(setAlert('Chat deleted', 'success'));
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

// Edit chat
export const editChat = (chat, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.put(`/api/chats/${chat}`, formData, config);

		dispatch({
			type: EDIT_CHAT,
			payload: res.data,
		});

		dispatch(setAlert('Changes saved', 'success'));
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

// Edit bookmarks
export const editBookmarks = (chat, user, bookmarks) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.put(
			`/api/chats/${chat}/${user}`,
			bookmarks,
			config
		);

		dispatch({
			type: EDIT_BOOKMARKS,
			payload: res.data,
		});

		dispatch(setAlert('Bookmarks updated', 'success'));
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

// Clear chat
export const clearChat = () => (dispatch) => {
	try {
		dispatch({
			type: CLEAR_CHAT,
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
