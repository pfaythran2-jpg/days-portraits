// Fays Portraits — lightweight interactions for GitHub Pages
const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('#navMenu');
menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Gallery filters
const filters = document.querySelectorAll('.filter');
const galleryItems = [...document.querySelectorAll('.gallery-item')];
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.toggle('active', item === filter));
  const category = filter.dataset.filter;
  galleryItems.forEach(item => item.classList.toggle('hide', category !== 'all' && item.dataset.category !== category));
}));

// Full-screen gallery viewer
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxTitle = document.querySelector('#lightboxTitle');
let currentImage = 0;
function openLightbox(index) {
  currentImage = index;
  const item = galleryItems[currentImage];
  lightboxImage.src = item.dataset.src;
  lightboxImage.alt = item.querySelector('img').alt;
  lightboxTitle.textContent = item.dataset.title;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImage.src = '';
}
function stepImage(direction) {
  const visible = galleryItems.filter(item => !item.classList.contains('hide'));
  const current = visible.indexOf(galleryItems[currentImage]);
  const next = (current + direction + visible.length) % visible.length;
  openLightbox(galleryItems.indexOf(visible[next]));
}
galleryItems.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
document.querySelector('#lightboxClose').addEventListener('click', closeLightbox);
document.querySelector('#lightboxPrev').addEventListener('click', () => stepImage(-1));
document.querySelector('#lightboxNext').addEventListener('click', () => stepImage(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') stepImage(-1);
  if (event.key === 'ArrowRight') stepImage(1);
});

// Update year automatically
 document.querySelector('#year').textContent = new Date().getFullYear();

// IMPORTANT: Replace 27XXXXXXXXX with your WhatsApp number including country code, no + or spaces.
const whatsappNumber = '27XXXXXXXXX';
const bookingMessage = encodeURIComponent('Hi Fays Portraits! I would like to enquire about booking a photoshoot.');
const whatsappLink = document.querySelector('#whatsappLink');
whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${bookingMessage}`;
