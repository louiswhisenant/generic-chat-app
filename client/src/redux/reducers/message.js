import {
	CREATE_MESSAGE,
	GET_MESSAGE,
	GET_MESSAGES,
	EDIT_MESSAGE,
	DELETE_MESSAGE,
	MESSAGE_ERROR,
} from '../actions/types';

const initialState = {
	message: null,
	messages: [],
	loading: true,
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_MESSAGE:
			return {
				...state,
				messages: [payload, ...state.messages],
				loading: false,
			};
		case GET_MESSAGE:
			return {
				...state,
				message: payload,
				loading: false,
			};
		case GET_MESSAGES:
			return {
				...state,
				messages: payload,
				loading: false,
			};
		case EDIT_MESSAGE:
			return {
				...state,
				messages: state.messages.map((message) =>
					message._id === payload._id ? payload : message
				),
				loading: false,
			};
		case DELETE_MESSAGE:
			return {
				...state,
				messages: state.messages.filter(
					(message) => message._id !== payload
				),
				loading: false,
			};
		case MESSAGE_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
