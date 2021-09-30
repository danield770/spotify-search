import { useState, useEffect } from 'react';
import { chooseRelevantItemData } from '../utils/helper';

function useFetch(url) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  useEffect(() => {
    console.log('useFetch:');
    if (!url) return;

    const token = JSON.parse(localStorage.getItem('params')).access_token;
    console.log('token', token);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    console.log('url: ', url);

    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(url, { headers });
      // if (!res.ok) {
      //   const message = `An error has occured: ${res.status}`;
      //   throw new Error(message);
      // }
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
  // return { data, isLoading, error };
  return { data, isLoading };
}

export default useFetch;
