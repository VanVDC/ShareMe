import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

const Dashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const getProfile = useSelector((state) => state.profile);
  const { loading: profileLoading, error: profileError, profile } = getProfile;

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
