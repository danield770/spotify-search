import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';
import {
  encodeSpaces,
  supportUnicodeText,
  chooseRelevantItemData,
} from '../utils/helper';

const Search = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  const onFormSubmit = (input) => {
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

  return (
    <main className={`app ${data?.items?.length > 0 ? 'has-data' : ''}`}>
      <Header />

      <SearchForm onFormSubmit={onFormSubmit} onSort={onSort} />
      {data?.items?.length > 0 && (
        <Results
          data={data}
          sortBy={sortBy}
          isLoading={isLoading}
          onFetchMore={onFetchMore}
        />
      )}
      {data.error && (
        <p className='error'>
          It looks like there was a {data.error?.status || ''} network error...
          since: "{data.error.message}"
        </p>
      )}
      {isLoading && <div className='loading'>Loading...</div>}
    </main>
  );
};
export default Search;
