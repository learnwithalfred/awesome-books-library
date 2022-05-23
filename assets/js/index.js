import data from './data.js';

const bookList = document.querySelector('.book-list');

const displayBooks = (arr) => {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const fetch = document.querySelector('.book-list').innerHTML;

    bookList.innerHTML = `<li class="book-item">
          <span class="book">${data[i].title} by ${data[i].author}</span>
          <button type="button" class="remove-book">Remove</button>
        </li>
              <hr />
${fetch}`;
  }
};
displayBooks(data);
