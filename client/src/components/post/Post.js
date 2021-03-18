import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import spinner
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postFromState = useSelector((state) => state.post);
  const { post, loading } = postFromState;

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [getPost]);
  return loading || post === null ? (
    <p>Loadidng..</p>
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showAction={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => {
          <CommentItem key={comment._id} comment={comment} postId={post._id} />;
        })}
      </div>
    </Fragment>
  );
};

export default Post;
