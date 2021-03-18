import { GET_POSTS, POST_ERROR, UPDATE_LIKE } from '../constants/postConstants';

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
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: payload.likes }
            : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
