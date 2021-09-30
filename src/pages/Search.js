import React, { useState } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';
import { useHistory, Redirect } from 'react-router-dom';
import { encodeSpaces, supportUnicodeText } from '../utils/helper';
import useFetch from '../hooks/useFetch';

const Search = ({ isValidSession }) => {
  const [url, setUrl] = useState('');
  // const [data, setData] = useState({});
  const [sortBy, setSortBy] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { data, isLoading } = useFetch(url);

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
    console.log('onFormSubmit: url: ', url);
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
    <main className={`app ${data?.total > 0 ? 'has-data' : ''}`}>
      <Header hasData={data?.total > 0} />

      <SearchForm
        onFormSubmit={onFormSubmit}
        onSort={onSort}
        hasData={data?.total > 0}
      />
      {results}
    </main>
  );
};
export default Search;
