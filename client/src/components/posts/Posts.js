import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postActions';
const Posts = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { posts, loading } = post;
  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);

  return <div></div>;
};

export default Posts;
