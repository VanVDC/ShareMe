import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import DashboardAction from './DashboardAction';

const Dashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const getProfile = useSelector((state) => state.profile);
  const { loading: profileLoading, error: profileError, profile } = getProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  console.log('p ', profile);

  return profileLoading ? (
    <p>loading....</p>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {' '}
        <i className='fas fa-user'>Welcome {userInfo.name}</i>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
        </Fragment>
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
