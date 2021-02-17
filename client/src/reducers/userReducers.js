import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_ADD_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userAddReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_REQUEST:
      return { loading: true };
    case USER_ADD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
