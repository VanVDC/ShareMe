import axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKE } from '../constants/postConstantss';

//get posts
export const getPosts = ()=> (dispatch, getState )=>{
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.get('/api/posts', config)

    dispatch({
      type: GET_POSTS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
//ADD LIKES
export const addLike = (postId)=> (dispatch, getState )=>{
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.put(`/api/postd/like/${postId}`, config)

    dispatch({
      type: UPDATE_LIKE,
      payload: {id, likes: data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
//Remove LIKES
export const removeLike = (id)=> (dispatch, getState )=>{
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.put(`/api/postd/unlike/${id}`, config)

    dispatch({
      type: UPDATE_LIKE,
      payload: {id, likes: data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}