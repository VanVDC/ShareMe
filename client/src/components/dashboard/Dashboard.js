import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';

const Dashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const { user } = userInfo;

  const getProfile = useSelector((state) => state.profile);
  const { loading: profileLoading, error: profileError, profile } = getProfile;

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return profileLoading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {' '}
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You jave not yet setup profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            {' '}
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
