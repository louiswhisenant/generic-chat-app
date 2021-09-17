import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	loading: true,
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				profile: null,
				error: payload,
				loading: true,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: true,
			};
		default:
			return state;
	}
};
