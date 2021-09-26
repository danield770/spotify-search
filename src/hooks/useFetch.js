import { useState, useEffect, useCallback } from 'react';
import { chooseRelevantItemData } from '../utils/helper';

function useFetch(url, options, offset) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //   const sendQuery = useCallback(async () => {
  //     try {
  //       await setIsLoading(true);
  //       console.log('useFetch: token is: ', options.Authorization);
  //       const res = await fetch(`${url}&offset=${offset}`, { options });
  //       const json = await res.json();
  //       setIsLoading(false);
  //       console.log('useFetch: setting data...', json);

  //       if (json.error !== undefined) {
  //         setData(json);
  //         return;
  //       }

  //       setData((prev) => {
  //         if (json.tracks.offset === 0) {
  //           // hit a new request
  //           return {
  //             href: json.tracks.href,
  //             total: json.tracks.total,
  //             next: json.tracks.next,
  //             previous: json.tracks.previous,
  //             items: [...chooseRelevantItemData(json.tracks.items)],
  //           };
  //         } else {
  //           // setHasNext(json.tracks.next !== null);
  //           return {
  //             ...prev,
  //             next: json.tracks.next,
  //             previous: json.tracks.previous,
  //             items: [
  //               ...prev.items,
  //               ...chooseRelevantItemData(json.tracks.items),
  //             ],
  //           };
  //         }
  //       });
  //     } catch (err) {
  //       setIsLoading(false);
  //       setData(err);
  //     }
  //   }, [url, offset]);

  //   useEffect(() => {
  //     sendQuery(url);
  //   }, [url, sendQuery]);

  //   return { data, isLoading };
}

export default useFetch;
