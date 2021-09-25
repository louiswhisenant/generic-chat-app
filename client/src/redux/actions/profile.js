import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	DELETE_ACCOUNT,
	PROFILE_LOADING,
	GET_PROFILE_SEARCH,
	CLEAR_PROFILE_SEARCH,
} from './types';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profiles/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Search for profile by username
export const getProfileBySearch = (search) => async (dispatch) => {
	try {
		const authRes = await axios.get(`/api/auth/${search}`);

		const res = await axios.get(`/api/profiles/${authRes.data}`);

		dispatch({
			type: GET_PROFILE_SEARCH,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, 'danger'));
			});
		}

		dispatch({
			type: CLEAR_PROFILE_SEARCH,
		});
	}
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profiles/users/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get user contacts' profiles
export const getContactProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profiles');

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Create profile
export const createProfile = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/profiles', formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('New profile created', 'success'));

		history.push('/dash');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, 'danger'));
			});
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Edit profile
export const editProfile = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put('/api/profiles', formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, 'danger'));
			});
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Add profile contact
export const addContact = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put(
			'/api/profiles/add-contact',
			formData,
			config
		);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, 'danger'));
			});
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
	try {
		await axios.delete(`/api/profiles`);

		dispatch({ type: CLEAR_PROFILE });
		dispatch({ type: DELETE_ACCOUNT });

		dispatch(setAlert('Account deleted', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

export const setProfileLoading = () => (dispatch) => {
	dispatch({ type: PROFILE_LOADING });
};

export const clearProfileSearch = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE_SEARCH });
};
