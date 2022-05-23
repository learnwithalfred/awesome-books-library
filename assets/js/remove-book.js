const removeBook = (arr = [], id = '') => arr.filter((e) => e.id !== id);

export default removeBook;
