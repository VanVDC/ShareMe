import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
// import Spinner
import { getProfileById } from '../../actions/profileActions';

const Profile = ({ match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;

  const useprofile = useSelector((state) => state.profile);
  const { profile, loading } = useprofile;

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [getProfileById, match]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <p>loading....</p>
      ) : (
        <Fragment>
          <Link to='/profile' className='btn btn-light'>
            Back to Profiles
          </Link>
          {userInfo &&
            userLoading === false &&
            userInfo.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
