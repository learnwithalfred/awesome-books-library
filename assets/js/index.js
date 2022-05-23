import initialData from './data.js';
import addBook from './add-book.js';

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('.form');
const ul = document.querySelector('.book-list');

const saveToLocalStorage = (data) => {
  const booksString = JSON.stringify(data);
  localStorage.setItem('bookStoreData', booksString);
  return true;
};

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

const savedData = () => {
  const rawBooksData = localStorage.getItem('bookStoreData');
  let books;
  if (rawBooksData) {
    books = JSON.parse(rawBooksData);
  } else {
    books = initialData;
    saveToLocalStorage(books);
  }
  return books;
};
savedData();
const booksData = savedData();

const getBooks = (myBooksArr) => {
  const booksArr = myBooksArr.map((book) => {
    const li = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove Book';
    ul.append(li);
    li.innerText = `${book.title} by ${book.author}`;
    li.append(removeBtn);
    removeBtn.setAttribute('id', book.id);
    removeBtn.setAttribute('class', 'remove-button');

    // remove element on click
    removeBtn.addEventListener('click', (event) => {
      for (let i = 0; i < myBooksArr.length; i += 1) {
        if (myBooksArr[i].id === event.target.id) {
          myBooksArr.splice(i, 1);
        }
      }
      return getBooks(myBooksArr);
    });

    // return created elements
    return {
      li,
      removeBtn,
    };
  });
  return booksArr;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook(booksData, title.value, author.value, generateId());
  window.location.reload();
  return saveToLocalStorage(booksData);
});

getBooks(booksData);
