import React, { useEffect } from 'react';
import { getParamValues } from '../utils/helper';
import { useLocation, useHistory } from 'react-router-dom';
const Redirect = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // console.log('location.hash = ', location.hash);
    !location.hash && history.push('/search');
    const access_token = getParamValues(location.hash);
    const expiryTime = Date.now() + access_token.expires_in * 1000;
    // console.log('token = ', access_token);
    localStorage.setItem('params', JSON.stringify(access_token));
    localStorage.setItem('expiry_time', expiryTime);
    history.push('/spotify-search/search');
  }, []);
  return null;
};
export default Redirect;
