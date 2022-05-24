/* eslint-disable max-classes-per-file */

import initialData from './data.js';

const form = document.querySelector('#form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

// generate unique id
const generateId = (length = 10) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
    this.data = this.data.filter((book) => book.id !== id);
    localStorage.setItem('bookStoreData', JSON.stringify(this.data));
  }
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = generateId();
  }
}

const booksData = new BookList();

function displayBooks(book) {
  const ul = document.querySelector('.book-list');
  const li = document.createElement('li');
  li.classList.add('list');
  li.setAttribute('id', book.id);
  li.innerText = `${book.title} by ${book.author}`;
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  removeBtn.addEventListener('click', () => booksData.removeBook(book.id));
  li.appendChild(removeBtn);
  ul.appendChild(li);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value && author.value) {
    const newBook = new Book(title.value, author.value);
    booksData.addBook(newBook);
    displayBooks(newBook);
  }
  return false;
});

window.onload = () => {
  booksData.data = JSON.parse(localStorage.getItem('bookStoreData' || '[]'));
  if (booksData.data === null) {
    booksData.data = initialData;
    localStorage.setItem('bookStoreData', JSON.stringify(initialData));
    return;
  }

  booksData.data.forEach((book) => displayBooks(book));
};
