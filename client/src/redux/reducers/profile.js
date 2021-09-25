import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	PROFILE_LOADING,
	GET_PROFILE_SEARCH,
	CLEAR_PROFILE_SEARCH,
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	search: null,
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
		case GET_PROFILE_SEARCH:
			return {
				...state,
				search: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false,
			};
		case CLEAR_PROFILE_SEARCH:
			return {
				...state,
				search: null,
				loading: false,
			};
		case PROFILE_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
