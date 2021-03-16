import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Spinner
import { getProfileById } from '../../actions/profileActions';

const Profile = ({ match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profile = useSelector((state) => state.profile);
  const { profile, loading } = profile;

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [getProfileById]);
  return <div>profile</div>;
};

export default Profile;
