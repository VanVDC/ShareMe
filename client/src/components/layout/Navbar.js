import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> ShareMe
        </Link>
      </h1>
      <ul>
        <li>
          <a href='profiles.html'>Developers</a>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        {userInfo ? (
          <li>
            <i className='fas fa-sign-out-alt'></i>
            <Link onClick={logoutHandler}>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
