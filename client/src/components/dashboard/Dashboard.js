import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/userActions';

const Dashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const getProfile = useSelector((state) => state.profile);
  const { loading: profileLoading, error: profileError, profile } = getProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

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
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => dispatch(deleteAccount())}
            >
              <i className='fas fa-user-minus'>Delete My Account</i>
            </button>
          </div>
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
