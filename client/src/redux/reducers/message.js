import {
	CREATE_MESSAGE,
	GET_MESSAGE,
	GET_MESSAGES,
	EDIT_MESSAGE,
	DELETE_MESSAGE,
	SELECT_MESSAGE,
	DESELECT_MESSAGE,
	CLEAR_SELECTED,
	MESSAGE_ERROR,
	MESSAGE_RESET,
} from '../actions/types';

const initialState = {
	message: null,
	messages: [],
	selected: [],
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
					(message) => payload.includes(message._id) === false
				),
				loading: false,
			};
		case SELECT_MESSAGE:
			return {
				...state,
				selected: [...state.selected, payload],
				loading: false,
			};
		case DESELECT_MESSAGE:
			return {
				...state,
				selected: state.selected.filter((id) => id !== payload),
				loading: false,
			};
		case CLEAR_SELECTED:
			return {
				...state,
				selected: [],
				loading: false,
			};
		case MESSAGE_RESET:
			return {
				message: null,
				messages: [],
				selected: [],
				loading: true,
				error: {},
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
