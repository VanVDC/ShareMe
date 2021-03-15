import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  CLEAR_PROFILE,
  CREATE_PROFILE_REQUEST,
} from '../constants/profileConstants';

export const getCurrentProfileReducer = (
  state = { profile: null, profiles: [], repos: [] },
  action
) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
      };

    case GET_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };

    case CREATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    default:
      return state;
  }
};
