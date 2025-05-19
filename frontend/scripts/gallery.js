document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery-container');
  // Placeholder images
  const images = [
    '../assets/chanket.jpg',
    '../assets/fullmastichanket.webp',
    '../assets/mastichanket.webp',
    '../assets/Chaitanya.jpg'
  ];
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Gallery Image';
    gallery.appendChild(img);
  });
}); 