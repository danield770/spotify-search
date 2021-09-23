import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { encodeSpaces } from './utils/helper';

const App = () => {
  const token = Cookies.get('spotifyAuthToken');
  console.log('rendering spotify app...');
  // const url = 'https://api.spotify.com/v1/search?query=Benny+Friedman+year:2021-2021&type=track&market=US&offset=0&limit=5';
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    if (!url) return;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    console.log('url: ', url);
    console.log('headers: ', headers);
    const getData = async () => {
      const res = await fetch(url, { headers });
      const json = await res.json();
      console.log('setting data...');
      setData(json.tracks);
    };
    getData();
  }, [url, token]);

  const onFormSubmit = (input) => {
    //e.preventDefault();
    const yearRange = input.filter ? `+year:${input.filter}` : '';
    const url = `https://api.spotify.com/v1/search?query=${encodeSpaces(
      input.text
    )}${yearRange}&type=track&market=US&offset=0&limit=5`;
    console.log('url: ', url);
    setUrl(url);
  };
  const onSort = (value) => {
    console.log('sort: ', value);
    setSortBy(value);
  };

  return (
    <div className='app'>
      <SearchForm onFormSubmit={onFormSubmit} onSort={onSort} />
      {token ? (
        <Results data={data} sortBy={sortBy} />
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri='http://localhost:3000/callback'
          clientID={process.env.REACT_APP_CLIENT_ID}
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
        />
      )}
    </div>
  );
};
export default App;
