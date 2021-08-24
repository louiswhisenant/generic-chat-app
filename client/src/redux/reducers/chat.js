import {
	CREATE_CHAT,
	GET_CHAT,
	GET_CHATS,
	EDIT_CHAT,
	DELETE_CHAT,
	CHAT_ERROR,
} from '../actions/types';

const initialState = {
	chat: null,
	chats: [],
	loading: true,
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_CHAT:
			return {
				...state,
				chats: [payload, ...state.chats],
				loading: false,
			};
		case GET_CHAT:
			return {
				...state,
				chat: payload,
				loading: false,
			};
		case GET_CHATS:
			return {
				...state,
				chats: payload,
				loading: false,
			};
		case EDIT_CHAT:
			return {
				...state,
				chats: state.chats.map((chat) =>
					chat._id === payload._id ? payload : chat
				),
				loading: false,
			};
		case DELETE_CHAT:
			return {
				...state,
				chats: state.chats.filter((chat) => chat._id !== payload),
				loading: false,
			};
		case CHAT_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
