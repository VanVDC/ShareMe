import axios from 'axios';

import {
  CREATE_PROFILE_REQUEST,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILES_FAIL,
  GET_PROFILES_REQUEST,
  GET_PROFILES_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_REPOS,
} from '../constants/profileConstants';

//get current users profile

export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile/me`, config);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all profiles
export const getProfiles = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    dispatch({ type: GET_PROFILES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile`, config);

    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// get profile by id
export const getProfileById = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile/user/${userId}`, config);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getGithubRepos = (username) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile/github/${username}`, config);

    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({
      type: CREATE_PROFILE_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post('api/profile', formData, config);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({
      type: CREATE_PROFILE_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      'api/profile/experience',
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    // if (!edit) {
    //   history.push('/dashboard');
    // }
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add Education
export const addEducation = (formData, history) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({
      type: CREATE_PROFILE_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put('api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    // if (!edit) {
    //   history.push('/dashboard');
    // }
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete experience fix the error

export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({
      type: CREATE_PROFILE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/profile/experience/${id}`,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({
      type: CREATE_PROFILE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/profile/education/${id}`, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
