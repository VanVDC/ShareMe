import axios from 'axios';

import { GET_PROFILE, PROFILE_ERROR } from '../constants/profileConstants';

//get current users profile

export const getCurrentProfile = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.get(`/api/profile/me`, config);
    console.log('data: ', data);
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
