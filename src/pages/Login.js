import React from 'react';

const Login = () => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };
  return (
    <div className='login'>
      <h1 className='search-header'>We first need to login to Spotify</h1>
      <button className='btn--primary' type='submit' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
export default Login;
