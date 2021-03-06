import axios from 'axios';
import { setAlert } from './alert';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_LOGOUT,
  DELETE_ACCOUNT,
} from '../constants/userConstants';

import {
  CLEAR_PROFILE,
  UPDATE_PROFILE_ERROR,
} from '../constants/profileConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addUser = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: USER_ADD_REQUEST });
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );
    dispatch({
      type: USER_ADD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
  document.location.href = '/login';
};

//delete account and profile
export const deleteAccount = (id) => async (dispatch, getState) => {
  if (window.confirm('Are you sure?'))
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/profile/`, config);
      localStorage.removeItem('userInfo');

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      document.location.href = '/login';
    } catch (err) {
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};
