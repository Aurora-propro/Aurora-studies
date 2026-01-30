// Data for studies – replace or extend with your own.
// Make sure each entry is SHORT, neutral, and references peer‑reviewed work.
const studies = [
  {
    id: 1,
    title: "Sleep duration and academic performance in adolescents",
    field: "health",
    year: 2019,
    venue: "Journal of Youth and Adolescence",
    authors: "Short, M. A. et al.",
    summary:
      "Adolescents who regularly slept fewer than eight hours on school nights showed lower grades and more daytime sleepiness compared with peers meeting sleep recommendations.",
    tags: ["sleep", "grades", "secondary school"],
    doi: "10.1007/s10964-018-0900-8",
    url: "https://doi.org/10.1007/s10964-018-0900-8"
  },
  {
    id: 2,
    title: "Spacing out practice improves long‑term retention",
    field: "education",
    year: 2015,
    venue: "Psychological Science",
    authors: "Carpenter, S. K. et al.",
    summary:
      "Students who distributed practice over several sessions remembered material weeks later better than those who crammed the same number of repetitions in a single session.",
    tags: ["learning", "memory", "study strategies"],
    doi: "10.1177/0956797615575615",
    url: "https://doi.org/10.1177/0956797615575615"
  },
  {
    id: 3,
    title: "Growth mindset interventions and student achievement",
    field: "psychology",
    year: 2019,
    venue: "Nature",
    authors: "Yeager, D. S. et al.",
    summary:
      "A brief online activity that framed intelligence as malleable produced small but significant gains in grades, especially for lower‑achieving students, in a large national sample.",
    tags: ["mindset", "motivation", "achievement"],
    doi: "10.1038/s41586-019-1466-y",
    url: "https://doi.org/10.1038/s41586-019-1466-y"
  },
  {
    id: 4,
    title: "Green space and cognitive development in schoolchildren",
    field: "environment",
    year: 2015,
    venue: "Proceedings of the National Academy of Sciences",
    authors: "Dadvand, P. et al.",
    summary:
      "Children attending schools with more surrounding greenery showed better working memory and attention over time compared with those in less green environments.",
    tags: ["environment", "cognition", "schools"],
    doi: "10.1073/pnas.1503402112",
    url: "https://doi.org/10.1073/pnas.1503402112"
  },
  {
    id: 5,
    title: "Exercise before learning and memory in adolescents",
    field: "neuroscience",
    year: 2020,
    venue: "Trends in Neuroscience and Education",
    authors: "van den Berg, V. et al.",
    summary:
      "Moderate physical activity shortly before a lesson was associated with modest improvements in memory and attention in adolescents across several classroom studies.",
    tags: ["exercise", "memory", "attention"],
    doi: "10.1016/j.tine.2019.100124",
    url: "https://doi.org/10.1016/j.tine.2019.100124"
  }
];

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const fieldFilter = document.getElementById("fieldFilter");
const yearFilter = document.getElementById("yearFilter");

function renderPosts(list) {
  postsContainer.innerHTML = "";

  if (!list.length) {
    postsContainer.innerHTML =
      '<p style="color:#ffb3d0;font-size:0.9rem;">No studies match your filters. Try a broader query.</p>';
    return;
  }

  list.forEach((study) => {
    const card = document.createElement("article");
    card.className = "post-card";
    card.innerHTML = `
      <div class="post-inner">
        <div class="post-meta-top">
          <span class="field-pill">${study.field}</span>
          <span class="year-pill">${study.year}</span>
        </div>
        <h3 class="post-title">${study.title}</h3>
        <p class="post-venue">${study.venue}</p>
        <p class="post-summary">${study.summary}</p>
        <div class="post-meta-bottom">
          <span class="authors">${study.authors}</span>
          <div class="tags">
            ${study.tags.map((t) => `<span>${t}</span>`).join("")}
          </div>
        </div>
        <div class="post-links">
          <a href="${study.url}" target="_blank" rel="noopener noreferrer">
            View original study
          </a>
          <a href="https://doi.org/${study.doi}" target="_blank" rel="noopener noreferrer">
            DOI link
          </a>
        </div>
      </div>
    `;
    postsContainer.appendChild(card);
  });
}

function passesYearFilter(study, yearValue) {
  if (yearValue === "all") return true;
  if (yearValue === "2023") return study.year >= 2023;
  if (yearValue === "2018-2022") return study.year >= 2018 && study.year <= 2022;
  if (yearValue === "2010-2017") return study.year >= 2010 && study.year <= 2017;
  return true;
}

function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();
  const fieldValue = fieldFilter.value;
  const yearValue = yearFilter.value;

  const filtered = studies.filter((study) => {
    const inField = fieldValue === "all" || study.field === fieldValue;
    const inYear = passesYearFilter(study, yearValue);
    const inSearch =
      !query ||
      study.title.toLowerCase().includes(query) ||
      study.summary.toLowerCase().includes(query) ||
      study.tags.join(" ").toLowerCase().includes(query) ||
      study.venue.toLowerCase().includes(query);

    return inField && inYear && inSearch;
  });

  renderPosts(filtered);
}

searchInput.addEventListener("input", applyFilters);
fieldFilter.addEventListener("change", applyFilters);
yearFilter.addEventListener("change", applyFilters);

// Initial render
renderPosts(studies);

// Filter button event listeners
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    // Get all posts
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
      if (filterValue === 'all') {
        post.classList.remove('hidden');
      } else {
        const postTopic = post.getAttribute('data-topic');
        if (postTopic === filterValue) {
          post.classList.remove('hidden');
        } else {
          post.classList.add('hidden');
        }
      }
    });
  });
});

