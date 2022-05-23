const addBook = (arr = [], title = '', author = '', id = '') => {
  if (title && author) {
    arr.push({ id, title, author });
    return arr;
  }
  return false;
};
export default addBook;
