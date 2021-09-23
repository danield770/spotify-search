import { useState, useEffect } from 'react';

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useFetch: url: ', url);
    if (url) {
      setIsLoading(true);
      setData(null);
      fetch(url, { options })
        .then((res) => res.json())
        .then((json) => {
          setIsLoading(false);
          if (typeof json === 'string') {
            throw new Error(json);
          }
          setData(json);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [url, options]);

  return { data, isLoading };
}

// const response = await fetch(url);
//       const result = await response.json();
//       // console.log('result: ', result);
//       if (typeof result === 'string') {
//         throw new Error(result);
//       }

export default useFetch;
