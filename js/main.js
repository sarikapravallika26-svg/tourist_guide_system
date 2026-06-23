const toast = document.getElementById('toast');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');
const pageLoader = document.getElementById('pageLoader');
const themeToggleButtons = document.querySelectorAll('[data-theme-toggle]');
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const siteBody = document.body;

const destinationNames = [
  'Goa', 'Paris', 'Swiss Alps', 'New York', 'Kyoto', 'Dubai',
  'Bali', 'Kenya', 'Hyderabad', 'Kashmir', 'Maldives', 'Mysore'
];

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
}

window.showToast = showToast;

function setThemeButtonText(isDark) {
  themeToggleButtons.forEach((button) => {
    button.textContent = isDark ? 'Light' : 'Dark';
    button.setAttribute('aria-pressed', isDark ? 'false' : 'true');
  });
}

function applyTheme(theme) {
  const normalizedTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', normalizedTheme);
  localStorage.setItem('siteTheme', normalizedTheme);
  setThemeButtonText(normalizedTheme !== 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
}

function loadTheme() {
  const savedTheme = localStorage.getItem('siteTheme');
  applyTheme(savedTheme || 'dark');
}

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollPosition = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollPosition / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

function updateBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle('visible', window.scrollY > 420);
}

function initHeroCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 120));
    const interval = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        window.clearInterval(interval);
      } else {
        counter.textContent = current.toLocaleString();
      }
    }, 15);
  });
}

function initTestimonials() {
  const items = document.querySelectorAll('.testimonial-item');
  let index = 0;
  if (!items.length) return;
  window.setInterval(() => {
    items[index].classList.remove('active');
    index = (index + 1) % items.length;
    items[index].classList.add('active');
  }, 5200);
}

function initDestinationSuggestions() {
  const list = document.getElementById('destinationSuggestions');
  if (!list) return;
  destinationNames.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    list.appendChild(option);
  });
}

function initSearchNavigation() {
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  const heroSearch = document.getElementById('heroSearch');
  if (!heroSearchBtn || !heroSearch) return;

  heroSearchBtn.addEventListener('click', () => {
    const search = heroSearch.value.trim();
    if (!search) {
      document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const destinationsUrl = siteBody?.dataset.destinationsUrl || '/destinations/';
    const url = new URL(destinationsUrl, window.location.origin);
    url.searchParams.set('q', search);
    window.location.href = url.toString();
  });
}

function initHeaderToggle() {
  if (!navToggle || !mainNav) return;
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active') ? 'true' : 'false');
  });
}

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail')?.value.trim();
    if (!email) {
      showToast('Enter a valid email address');
      return;
    }
    showToast('Subscribed successfully!');
    form.reset();
  });
}

function initBackToTop() {
  if (!backToTop) return;
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initGallerySlider() {
  const galleryMain = document.getElementById('galleryMain');
  const galleryThumbs = document.getElementById('galleryThumbs');
  if (!galleryMain || !galleryThumbs) return;
  galleryThumbs.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    const mainImage = galleryMain.querySelector('img');
    if (mainImage) {
      mainImage.src = target.src;
      mainImage.alt = target.alt;
    }
  });
}

window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateBackToTop();
});

window.addEventListener('load', () => {
  if (pageLoader) {
    pageLoader.style.opacity = '0';
    pageLoader.style.visibility = 'hidden';
    window.setTimeout(() => {
      pageLoader.style.display = 'none';
    }, 400);
  }

  loadTheme();
  updateScrollProgress();
  updateBackToTop();
  initHeroCounters();
  initTestimonials();
  initDestinationSuggestions();
  initSearchNavigation();
  initHeaderToggle();
  initNewsletterForm();
  initBackToTop();
  initGallerySlider();
});

themeToggleButtons.forEach((button) => {
  button.addEventListener('click', toggleTheme);
});
