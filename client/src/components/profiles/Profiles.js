import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Spinner
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';
const Profiles = ({}) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { loading, profiles } = profile;

  useEffect(() => {
    dispatch(getProfiles());
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'>
              Browse and connect with developers
            </i>
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No Profiles found..</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
