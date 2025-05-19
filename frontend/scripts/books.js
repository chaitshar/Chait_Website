document.addEventListener('DOMContentLoaded', async function() {
  const books = [
    'Zero to One',
    'Flash Boys',
    'The Personal MBA',
    'The Diary of a CEO',
    'Crucial Conversations',
    'Ogilvy on Advertising',
    'Freakonomics',
    '12 Rules for Life',
    '50 Psychology Classics'
  ];

  const carousel = document.getElementById('books-carousel');
  if (!carousel) return;

  // Helper to fetch book data from Google Books API
  async function fetchBookData(title) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&maxResults=1`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const info = data.items[0].volumeInfo;
        // Use the highest quality image available
        const imageLinks = info.imageLinks || {};
        const cover = imageLinks.extraLarge || imageLinks.large || imageLinks.medium || imageLinks.thumbnail || imageLinks.smallThumbnail || null;
        return {
          title: info.title || title,
          author: (info.authors && info.authors.join(', ')) || 'Unknown Author',
          cover,
          description: info.description || '',
        };
      }
    } catch (e) {}
    return { title, author: 'Unknown Author', cover: null, description: '' };
  }

  // Render books
  carousel.innerHTML = '<div style="padding:2em;text-align:center;">Loading books...</div>';
  const bookData = await Promise.all(books.map(fetchBookData));
  carousel.innerHTML = '';
  bookData.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-cover">
        <img src="${book.cover || '../assets/FinTechFriyay.webp'}" alt="${book.title} Cover">
      </div>
      <div class="book-content">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <p class="book-description">${book.description ? book.description.substring(0, 120) + '...' : ''}</p>
        <a href="#" class="book-link">Read my notes →</a>
      </div>
    `;
    carousel.appendChild(card);
  });

  // Attach arrow event listeners after rendering
  const prevBtn = document.getElementById('books-prev');
  const nextBtn = document.getElementById('books-next');
  const scrollAmount = 320; // px, should match .book-card min-width
  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener('click', function() {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function() {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}); 