import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';
import { useHistory, Redirect } from 'react-router-dom';
import {
  encodeSpaces,
  supportUnicodeText,
  chooseRelevantItemData,
} from '../utils/helper';

const Search = ({ isValidSession }) => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!url) return;
    var token = JSON.parse(localStorage.getItem('params')).access_token;
    console.log('token', token);
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
  }, [url]);

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            token_expired: true,
          },
        }}
      />
    );
  }

  const onFormSubmit = (input) => {
    // TODO: check if this code is necessary OR if I can rely on the redirect
    if (!isValidSession()) {
      history.push({
        pathname: '/',
        state: {
          token_expired: true,
        },
      });
    }
    const yearRange = input.filter ? `+year:${input.filter}` : '';
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
  let results;
  if (data?.total > 0) {
    results = (
      <Results
        data={data}
        sortBy={sortBy}
        isLoading={isLoading}
        onFetchMore={onFetchMore}
      />
    );
  } else if (data?.total === 0) {
    results = <div>Sorry, no results found 🙁 </div>;
  } else if (data.error) {
    results = (
      <p className='error'>
        It looks like there was a {data.error?.status || ''} network error...
        since: "{data.error.message}"
      </p>
    );
  } else if (isLoading) {
    results = <div className='loading'>Loading...</div>;
  }

  return (
    <main className={`app ${data?.items?.length > 0 ? 'has-data' : ''}`}>
      <Header />

      <SearchForm onFormSubmit={onFormSubmit} onSort={onSort} />
      {results}
    </main>
  );
};
export default Search;
