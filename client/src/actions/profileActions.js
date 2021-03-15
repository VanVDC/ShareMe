import axios from 'axios';

import {
  CREATE_PROFILE_REQUEST,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE,
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
export const addExperience = (formData, history) => async (dispatch) => {
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
// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
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
