import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	PROFILE_LOADING,
	PROFILES_LOADING,
	GET_PROFILE_SEARCH,
	CLEAR_PROFILE_SEARCH,
	ADD_PROFILE_CONTACT,
	REMOVE_PROFILE_CONTACT,
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	search: null,
	loading: true,
	profilesLoading: true,
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
		case ADD_PROFILE_CONTACT:
			return {
				...state,
				profile: payload.res,
				profiles: [...state.profiles, payload.profile],
				loading: false,
			};
		case REMOVE_PROFILE_CONTACT:
			return {
				...state,
				profile: payload.profile,
				profiles: state.profiles.filter(
					(profile) => profile.user._id !== payload.id
				),
				loading: false,
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
				profilesLoading: false,
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
		case PROFILES_LOADING:
			return {
				...state,
				profilesLoading: true,
			};
		default:
			return state;
	}
};
