// ===== SIMPLE SEARCH + FILTER LOGIC =====

// Search input
const searchInput = document.getElementById('searchInput');

// All posts
const posts = document.querySelectorAll('.post');

// Filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

// Current active filter ("all", "sleep", "focus", "exercise", etc.)
let activeFilter = 'all';

// Apply both the active filter button AND the search text
function applySearchAndFilter() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  posts.forEach(post => {
    const topic = post.getAttribute('data-topic'); // e.g. "sleep"
    const text = post.textContent.toLowerCase();   // all text inside the card

    const matchesFilter = activeFilter === 'all' || topic === activeFilter;
    const matchesSearch = !query || text.includes(query);

    if (matchesFilter && matchesSearch) {
      post.classList.remove('hidden');
    } else {
      post.classList.add('hidden');
    }
  });
}

// Update list whenever user types
if (searchInput) {
  searchInput.addEventListener('input', applySearchAndFilter);
}

// Filter button click handling
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button style
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Set active filter from data-filter
    activeFilter = button.getAttribute('data-filter'); // "all", "sleep", etc.

    // Re-apply with new filter
    applySearchAndFilter();
  });
});
