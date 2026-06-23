const destinationSearch = document.getElementById('destinationSearch');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const categoryButtons = document.querySelectorAll('.category-pill');
const destinationFiltersForm = document.getElementById('destinationFiltersForm');

function submitDestinationFilters() {
  if (!destinationFiltersForm || !destinationSearch || !categoryFilter || !sortFilter) return;
  const url = new URL(window.location.href);
  const query = destinationSearch.value.trim();
  const category = categoryFilter.value.trim();
  const sort = sortFilter.value.trim();

  if (query) {
    url.searchParams.set('q', query);
  } else {
    url.searchParams.delete('q');
  }

  if (category) {
    url.searchParams.set('category', category);
  } else {
    url.searchParams.delete('category');
  }

  if (sort) {
    url.searchParams.set('sort', sort);
  } else {
    url.searchParams.delete('sort');
  }

  window.location.href = url.toString();
}

if (destinationSearch) {
  destinationSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitDestinationFilters();
    }
  });
}

if (categoryFilter) {
  categoryFilter.addEventListener('change', () => {
    const selectedValue = categoryFilter.value;
    categoryButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.category === selectedValue);
    });
    submitDestinationFilters();
  });
}

if (sortFilter) {
  sortFilter.addEventListener('change', submitDestinationFilters);
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!categoryFilter) return;
    const selected = button.dataset.category || '';
    categoryFilter.value = categoryFilter.value === selected ? '' : selected;
    categoryButtons.forEach((item) => {
      item.classList.toggle('active', item === button && categoryFilter.value === selected);
    });
    submitDestinationFilters();
  });
});
