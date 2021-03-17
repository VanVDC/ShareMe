import { GET_POSTS, POST_ERROR } from '../constants/postConstants';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.ayload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
