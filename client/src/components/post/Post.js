import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import spinner
import { getPost } from '../../actions/postActions';
const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postFromState = useSelector((state) => state.post);
  const { post, loading } = postFromState;
  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [getPost]);
  return <div></div>;
};

export default Post;
