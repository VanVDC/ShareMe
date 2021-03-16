import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGithubRepos } from '../../actions/profileActions';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const { repos } = profile;

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [getGithubRepos]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos === null ? (
        <p>loading...</p>
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='nooperner noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-primary'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-primary'>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileGithub;
