// ===== SEARCH + FILTER LOGIC =====

const searchInput = document.getElementById('searchInput');
const posts = document.querySelectorAll('.post');
const filterButtons = document.querySelectorAll('.filter-btn');
const postsContainer = document.querySelector('.posts');

let activeFilter = 'all';

// Create "No results" message element
const noResultsMsg = document.createElement('p');
noResultsMsg.className = 'no-results';
noResultsMsg.textContent = 'No results found. Try a different search or filter.';
noResultsMsg.style.display = 'none';
noResultsMsg.style.textAlign = 'center';
noResultsMsg.style.color = 'rgba(255, 255, 255, 0.7)';
noResultsMsg.style.fontSize = '1.2rem';
noResultsMsg.style.marginTop = '2rem';
postsContainer.appendChild(noResultsMsg);

// Apply both search and filter
function applySearchAndFilter() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let visibleCount = 0;

  posts.forEach(post => {
    const topic = post.getAttribute('data-topic'); // "sleep", "focus", "exercise"
    const tags = post.getAttribute('data-tags'); // "sleep wellbeing school"
    const text = post.textContent.toLowerCase(); // all text content

    // Check filter match
    const matchesFilter = activeFilter === 'all' || topic === activeFilter || (tags && tags.toLowerCase().includes(activeFilter));    
    // Check search match (search in text content AND tags)
    const matchesSearch = !query || text.includes(query) || (tags && tags.toLowerCase().includes(query));

    if (matchesFilter && matchesSearch) {
      post.style.display = '';
      visibleCount++;
    } else {
      post.style.display = 'none';
    }
  });

  // Show/hide "No results" message
  if (visibleCount === 0) {
    noResultsMsg.style.display = 'block';
  } else {
    noResultsMsg.style.display = 'none';
  }
}

// Search input listener
if (searchInput) {
  searchInput.addEventListener('input', applySearchAndFilter);
}

// Filter button listeners
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button styling
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Update active filter
    activeFilter = button.getAttribute('data-filter');

    // Re-apply filtering
    applySearchAndFilter();
  });
});
