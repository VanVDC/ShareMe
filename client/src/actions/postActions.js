import axios from 'axios';
import { GET_POSTS, POST_ERROR } from '../constants/postConstantss';

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