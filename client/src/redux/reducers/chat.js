import {
	CREATE_CHAT,
	GET_CHAT,
	GET_CHAT_BOOKMARKS,
	GET_CHAT_PARTICIPANTS,
	GET_CHATS,
	EDIT_CHAT,
	EDIT_BOOKMARKS,
	DELETE_CHAT,
	CHAT_ERROR,
	CLEAR_CHAT,
} from '../actions/types';

const initialState = {
	chat: null,
	participants: [],
	bookmarks: [],
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
				chat: payload,
				chats: [payload, ...state.chats],
				loading: false,
			};
		case GET_CHAT:
			return {
				...state,
				chat: payload,
				loading: false,
			};
		case GET_CHAT_BOOKMARKS:
		case EDIT_BOOKMARKS:
			return {
				...state,
				bookmarks: payload,
				loading: false,
			};
		case GET_CHAT_PARTICIPANTS:
			return {
				...state,
				participants: payload,
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
				chat: payload,
				chats: state.chats.map((chat) =>
					chat._id === payload._id ? payload : chat
				),
				loading: false,
			};
		case DELETE_CHAT:
			return {
				...state,
				chat: state.chat._id === payload ? null : state.chat.chat,
				chats: state.chats.filter((chat) => chat._id !== payload),
				loading: false,
			};
		case CHAT_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case CLEAR_CHAT:
			return {
				...state,
				chat: null,
				participants: [],
				bookmarks: [],
				loading: false,
			};
		default:
			return state;
	}
};
