const API_URL = "https://api.jikan.moe/v4/anime";
const animeSection = document.getElementById("animeSection");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");

let currentPage = 1;
let currentSearch = "";

async function loadAnime(searchTerm = "", page = 1) {
  animeSection.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=6&q=${searchTerm}`);
    const result = await response.json();

    animeSection.innerHTML = "";

    if (result.data.length === 0) {
      animeSection.innerHTML = "<p>No anime found.</p>";
      return;
    }

    result.data.forEach( function(anime){
      const card = document.createElement("div");
      card.classList.add("amine-card");

      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}">
        <h2>${anime.title}</h2>
        <p>${anime.year || "Unknown Year"}</p>
      `;

      animeSection.appendChild(card);
    });
    

    prevBtn.disabled = page === 1;
    nextBtn.disabled = !result.pagination.has_next_page;

  } 
  catch (error) {
    animeSection.innerHTML = "<p>Failed to load. Please try again.</p>";
  }
}

searchInput.addEventListener("input", function(e) {
  currentSearch = e.target.value;
  currentPage = 1;
  loadAnime(currentSearch, currentPage);
});


prevBtn.addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    loadAnime(currentSearch, currentPage);
  }
});


nextBtn.addEventListener("click", function() {
  currentPage++;
  loadAnime(currentSearch, currentPage);
});


loadAnime();
