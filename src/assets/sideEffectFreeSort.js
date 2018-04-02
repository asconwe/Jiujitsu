export default (arr, sortMethod) => {
  const checkIndex = (sortedArr, val, method, index = 0) => {
    if (index === sortedArr.length) return index;
    const goToNext = method(sortedArr[index], val);
    if (goToNext < 0) {
      return checkIndex(sortedArr, val, method, index + 1);
    }
    return index;
  };

  const insertInto = (sortedArr, val, method) => {
    if (sortedArr.length === 0) return [val];
    const index = checkIndex(sortedArr, val, method);
    return [...sortedArr.slice(0, index), val, ...sortedArr.slice(index)];
  };

  return arr.reduce((sortedArr, val) => insertInto(sortedArr, val, sortMethod), []);
};
