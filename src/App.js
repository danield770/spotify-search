import './App.css';
import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import {
  encodeSpaces,
  supportUnicodeText,
  chooseRelevantItemData,
} from './utils/helper';

// import useFetch from './hooks/useFetch'; // had an authentication problem here :(

const App = () => {
  const token = Cookies.get('spotifyAuthToken');
  // console.log('token is: ', token);
  // console.log('rendering spotify app...');
  const [url, setUrl] = useState('');
  const [data, setData] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    console.log('url: ', url);

    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(url, { headers });
      const json = await res.json();
      setIsLoading(false);
      console.log('setting data...', json);
      if (json.error !== undefined) {
        setData(json);
        return;
      }

      setData((prev) => {
        if (json.tracks.offset === 0) {
          // hit a new request
          return {
            href: json.tracks.href,
            total: json.tracks.total,
            next: json.tracks.next,
            previous: json.tracks.previous,
            items: [...chooseRelevantItemData(json.tracks.items)],
          };
        } else {
          return {
            ...prev,
            next: json.tracks.next,
            items: [
              ...prev.items,
              ...chooseRelevantItemData(json.tracks.items),
            ],
          };
        }
      });
    };
    getData();
  }, [url, token]);

  const onFormSubmit = (input) => {
    const yearRange = input.filter ? `+year:${input.filter}` : '';
    // console.log('input text:', input.text);
    // console.log(
    //   'decoded input text:',
    //   encodeSpaces(supportUnicodeText(input.text))
    // );

    const url = `https://api.spotify.com/v1/search?query=${encodeSpaces(
      supportUnicodeText(input.text)
    )}${yearRange}&type=track&market=US`;
    console.log('url: ', url);
    sortBy && setSortBy(sortBy); // sortBy is '' by default
    setUrl(url);
  };
  const onSort = (value) => {
    // console.log('sort: ', value);
    setSortBy(value);
  };

  const onFetchMore = (url) => {
    setUrl(url);
  };

  return (
    <main className={`app ${data?.items?.length > 0 ? 'has-data' : ''}`}>
      <h1 className='search-header sticky'>
        <span aria-hidden='true'>
          Sp<span className='icon-logo'>o</span>tify
        </span>
        <span className='offscreen'>Spotify</span>
        <span className='icon-search'>Search</span>
      </h1>

      <SearchForm onFormSubmit={onFormSubmit} onSort={onSort} />
      {token ? (
        <Results
          data={data}
          sortBy={sortBy}
          isLoading={isLoading}
          onFetchMore={onFetchMore}
        />
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri='http://localhost:3000/callback'
          clientID={process.env.REACT_APP_CLIENT_ID}
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
        />
      )}
    </main>
  );
};
export default App;
