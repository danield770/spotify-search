export const encodeSpaces = (str) => str.replaceAll(' ', '+'); // not necessary!

export const sortByKey = (array, keyPath, isReversed) => {
  //   console.log('unsorted arr: ', array);
  const keyArray = keyPath.split(',');
  //   console.log('keyArray: ', keyArray);
  const sorted = array.slice().sort((a, b) => {
    const x = keyArray.reduce((acc, elem) => acc[elem], a);
    const y = keyArray.reduce((acc, elem) => acc[elem], b);
    if (isReversed) {
      return x > y ? -1 : x < y ? 1 : 0;
    }
    return x < y ? -1 : x > y ? 1 : 0;
  });
  //   console.log('sorted arr: ', sorted);
  return sorted;
};
