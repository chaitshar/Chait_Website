const books = [
  {
    title: 'Zero to One',
    author: 'Blake Masters and Peter Thiel',
    review: 'A handbook of agile software craftsmanship that has helped me write better, more maintainable code.'
  },
  {
    title: 'Flash Boys',
    author: 'Michael Lewis',
    review: 'A fascinating look into high-frequency trading and the hidden world of Wall Street.'
  },
  {
    title: 'The Personal MBA',
    author: 'Josh Kaufman',
    review: 'A comprehensive guide to business concepts and self-education.'
  },
  {
    title: 'The Diary of a CEO',
    author: 'Steven Bartlett',
    review: 'Insights and lessons from the journey of a modern entrepreneur.'
  },
  {
    title: 'Crucial Conversations',
    author: 'Kerry Patterson, Joseph Grenny, Ron McMillan, Al Switzler',
    review: 'A must-read for mastering difficult conversations in both personal and professional life.'
  },
  {
    title: 'Ogilvy on Advertising',
    author: 'David Ogilvy',
    review: 'Timeless advice and strategies from the father of advertising.'
  },
  {
    title: 'Freakonomics',
    author: 'Steven D. Levitt, Stephen J. Dubner',
    review: 'A quirky and insightful exploration of the hidden side of everything.'
  },
  {
    title: '12 Rules for Life',
    author: 'Jordan B. Peterson',
    review: 'A practical guide to living a meaningful and responsible life.'
  },
  {
    title: '50 Psychology Classics',
    author: 'Tom Butler-Bowdon',
    review: 'A summary of the most influential books in psychology.'
  }
];

const booksPerPage = 3;
let currentPage = 1;

function renderBooksPage(page) {
  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;
  const pageBooks = books.slice(start, end);
  const list = document.getElementById('books-list');
  list.innerHTML = pageBooks.map(book => `
    <div class="book-item">
      <h2>${book.title}</h2>
      <h4>by ${book.author}</h4>
      <p>${book.review}</p>
    </div>
  `).join('');
  document.getElementById('page-info').textContent = `Page ${currentPage} of ${Math.ceil(books.length / booksPerPage)}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === Math.ceil(books.length / booksPerPage);
}

document.addEventListener('DOMContentLoaded', function() {
  renderBooksPage(currentPage);
  document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      renderBooksPage(currentPage);
    }
  });
  document.getElementById('next-page').addEventListener('click', function() {
    if (currentPage < Math.ceil(books.length / booksPerPage)) {
      currentPage++;
      renderBooksPage(currentPage);
    }
  });
}); 