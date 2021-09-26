export const getParamValues = (url) => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};

export const encodeSpaces = (str) => str.replaceAll(' ', '+'); // not necessary!
export const supportUnicodeText = (str) =>
  decodeURIComponent(JSON.parse('"' + str.replace(/"/g, '\\"') + '"'));

export const sortByKey = (array, key, isReversed) => {
  return array.slice().sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (isReversed) {
      return x > y ? -1 : x < y ? 1 : 0;
    }
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

export const chooseRelevantItemData = (items) =>
  items.map(
    ({ id, name, track_number, popularity, preview_url, album, artists }) => ({
      id,
      name,
      track_number,
      popularity,
      preview_url,
      album_img: album.images[0].url,
      release_date: album.release_date,
      artist_name: artists[0].name,
    })
  );
