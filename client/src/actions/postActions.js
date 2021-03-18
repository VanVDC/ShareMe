import axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKE, DELETE_POST, ADD_POST, GET_POST } from '../constants/postConstantss';

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
    const {data} = await axios.put(`/api/posts/like/${postId}`, config)

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
    const {data} = await axios.put(`/api/posts/unlike/${id}`, config)

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
//delete post
export const deletePost = (id)=> (dispatch, getState )=>{
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/posts/${id}`, config)

    dispatch({
      type: DELETE_POST,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
//add post
export const addPost = (formData)=> (dispatch, getState )=>{
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.post(`/api/posts`,formData, config)

    dispatch({
      type: ADD_POST,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
//get post
export const getPost = (id)=> (dispatch, getState )=>{
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data}=await axios.post(`/api/posts/${id}`,formData, config)

    dispatch({
      type: GET_POST,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}