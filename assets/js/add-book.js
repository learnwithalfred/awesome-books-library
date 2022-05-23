const addBook = (arr = [], title = '', author = '') => {
  arr.push({ title, author });
  return arr;
};
export default addBook;
