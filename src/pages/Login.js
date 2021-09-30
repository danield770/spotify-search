import React from 'react';
import { constants } from '../utils/constants';
import { Redirect, useLocation } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({ isValidSession }) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = constants;

  const location = useLocation();
  const { state } = location;
  const tokenExpired = state?.token_expired;
  // console.log('Login component');
  // console.log('is this a valid session? ', isValidSession());

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };
  return (
    <>
      {isValidSession() ? (
        <Redirect to='/search' />
      ) : (
        <div className={styles.login}>
          <h1 className={styles['search-header']}>
            {tokenExpired
              ? 'Your token has expired. Please login again'
              : 'We first need to login to Spotify'}
          </h1>
          <button className='btn--primary' type='submit' onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </>
  );
};
export default Login;
