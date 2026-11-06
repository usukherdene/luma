const images = document.getElementById("gallery");
const loadMore = document.getElementById("load-more");
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search")
const searchButton = document.getElementById("search-button")

let currentPage = 0;
let currentSearch = "";



const main = async () => {
    const nextpage = currentPage + 1;
    loadMore.textContent = "Loading..."
    let url = `https://api.unsplash.com/photos?page=${nextpage}`

    if (currentSearch !== "") {
        url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(currentSearch)}&page=${nextpage}`
    }
    
    const response = await fetch(url, {
    headers: { Authorization: "Client-ID Am5j85tyUEVjXQWgAy1OYDfOPdHUhbImsYsGuvK48ww",},
});

    if (!response.ok) {
    throw new Error("Error");
    }

  const data = await response.json();
  const photos = currentSearch ? data.results : data;
  showPhotos(photos);
  currentPage = nextpage
  loadMore.textContent = "Load more ↓"
  }
  


const showPhotos = (photos) => {
    photos.forEach((photo) => {
        const id = photo.id;
        const imageUrl = photo.urls.small;
        images.innerHTML += `<img class="rounded-[12px] mb-5" src="${imageUrl}" alt="${id}"/>` 
    })
}



loadMore.addEventListener("click", () => {
    main();
});



searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    currentSearch = searchInput.value.trim()
    currentPage = 0
    main()
    images.innerHTML = ""
})



main();
