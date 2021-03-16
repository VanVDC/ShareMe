import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  CLEAR_PROFILE,
  CREATE_PROFILE_REQUEST,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  GET_PROFILES_REQUEST,
  GET_PROFILES_FAIL,
  GET_PROFILES_SUCCESS,
  GET_REPOS,
} from '../constants/profileConstants';

export const getCurrentProfileReducer = (
  state = { profile: null, profiles: [], repos: [] },
  action
) => {
  switch (action.type) {
    case GET_PROFILES_REQUEST:
    case GET_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case UPDATE_PROFILE:
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
      };
    case GET_PROFILES_FAIL:
    case UPDATE_PROFILE_ERROR:
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

    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
