/* eslint-disable max-classes-per-file */

const form = document.querySelector('.form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
// generate unique id
const generateId = (length = 10) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

class BookList {
  constructor() {
    this.data = [];
  }

  addBook(book) {
    this.data.push(book);
    localStorage.setItem('bookStoreData', JSON.stringify(this.data));
  }

  removeBook(id) {
    const book = document.getElementById(id);
    book.remove();
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
    localStorage.setItem('bookStoreData', JSON.stringify(this.data));
  }
}

class Book {
  constructor(Title, Author) {
    this.Title = Title;
    this.Author = Author;
    this.id = generateId();
  }
}

const booksData = new BookList();

function getBook() {
  const book = new Book(title.value, author.value);
  title.value = '';
  author.value = '';
  return book;
}

function displayBooks(bookOBJ) {
  const ul = document.querySelector('.book-list');
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('list');
  bookContainer.setAttribute('id', bookOBJ.id);
  bookContainer.innerHTML = `<p>${bookOBJ.Title} <br/> by ${bookOBJ.Author}</p>`;
  const deleteBook = document.createElement('button');
  deleteBook.innerHTML = 'Remove';
  deleteBook.addEventListener('click', () => booksData.removeBook(bookOBJ.id));
  bookContainer.appendChild(deleteBook);
  ul.appendChild(bookContainer);
}

form.addEventListener('submit', (e) => {
  const newBook = getBook();
  booksData.addBook(newBook);
  displayBooks(newBook);
  e.preventDefault();
});

window.onload = () => {
  booksData.data = JSON.parse(localStorage.getItem('bookStoreData' || '[]'));
  if (booksData.data === null) {
    booksData.data = [];
    return;
  }

  booksData.data.forEach((book) => displayBooks(book));
};
