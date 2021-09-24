import './App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import {
  encodeSpaces,
  supportUnicodeText,
  chooseRelevantItemData,
} from './utils/helper';

// import useFetch from './hooks/useFetch';

const App = () => {
  const token = Cookies.get('spotifyAuthToken');
  console.log('token is: ', token);
  console.log('rendering spotify app...');
  const [url, setUrl] = useState('');
  const [data, setData] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [offset, setOffset] = useState(0);
  // const headers = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${token}`,
  // };
  // const { data, isLoading } = useFetch(url, headers, 0);

  const observer = useRef();
  const fifthLastItem = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setHasNext((prev) => prev + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNext]
  );

  useEffect(() => {
    if (!url) return;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    console.log('url: ', url);
    console.log('headers: ', headers);
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(`${url}&offset=${offset}`, { headers });
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
          setHasNext(json.tracks.next !== null);
          return {
            ...prev,
            next: json.tracks.next,
            previous: json.tracks.previous,
            items: [
              ...prev.items,
              ...chooseRelevantItemData(json.tracks.items),
            ],
          };
        }
      });
    };
    getData();
  }, [url, token, offset]);

  const onFormSubmit = (input) => {
    const yearRange = input.filter ? `+year:${input.filter}` : '';
    console.log('input text:', input.text);
    console.log(
      'decoded input text:',
      encodeSpaces(supportUnicodeText(input.text))
    );

    const url = `https://api.spotify.com/v1/search?query=${encodeSpaces(
      supportUnicodeText(input.text)
    )}${yearRange}&type=track&market=US`;
    console.log('url: ', url);
    sortBy && setSortBy(sortBy);
    setUrl(url);
  };
  const onSort = (value) => {
    console.log('sort: ', value);
    setSortBy(value);
  };

  return (
    <main className={`app ${data?.items?.length > 0 ? 'has-data' : ''}`}>
      <h1 className='search-header'>
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
          observer={observer}
          fifthLastItem={fifthLastItem}
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
