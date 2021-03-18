import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  DELETE_POST,
  ADD_POST,
} from '../constants/postConstants';

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
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
