const removeBook = (arr = [], id = '') => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id === id) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

export default removeBook;
