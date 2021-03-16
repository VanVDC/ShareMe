import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Spinner
import { getProfiles } from '../../actions/profileActions';
const Profiles = ({}) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { loading, profiles } = profile;

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  return <div></div>;
};

export default Profiles;
