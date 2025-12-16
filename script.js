const boxContainer = document.getElementById("boxContainer");
const body = document.getElementById("body");
const modalBodyContainer = document.getElementById("modalBodyContainer");
const allCount = document.getElementById("allCount");
const moviesCount = document.getElementById("moviesCount");
const seriesCount = document.getElementById("seriesCount");
const animeCount = document.getElementById("animeCount");
const gameCount = document.getElementById("gameCount");
const tabs = document.querySelectorAll(".tab");
const tabsArray = [...tabs];

const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

let movies = [];
let editOrDone = false;
let starsEdit = false;
let currTab = movies;
let selectedTab = "All";
movies.push(...savedMovies);

movies.forEach((movie) => createCards(movie));

function displayCounts() {
  const movieLength = movies.filter((movie) => movie.type === "Movie");
  const seriesLength = movies.filter((movie) => movie.type === "Series");
  const animeLength = movies.filter((movie) => movie.type === "Anime/Manga");
  const gameLength = movies.filter((movie) => movie.type === "Game");

  allCount.innerHTML = `(${movies.length})`;
  moviesCount.innerHTML = `(${movieLength.length})`;
  seriesCount.innerHTML = `(${seriesLength.length})`;
  animeCount.innerHTML = `(${animeLength.length})`;
  gameCount.innerHTML = `(${gameLength.length})`;
}
displayCounts();

function createCards(movie) {
  const box = document.createElement("div");
  const boxName = document.createElement("div");
  const movieImage = document.createElement("img");
  const starsContainer = document.createElement("div");
  const stars = document.createElement("div");

  boxContainer.appendChild(box);
  box.appendChild(boxName);
  box.appendChild(movieImage);
  box.appendChild(starsContainer);
  starsContainer.appendChild(stars);

  box.classList.add("box");
  boxName.classList.add("boxName");
  movieImage.classList.add("movieImage");
  starsContainer.classList.add("cardStars");

  const posterLow = movie.Poster;
  const posterHigh = posterLow.split("@._V1_")[0] + "@.jpg";

  box.id = movie.id;
  boxName.innerHTML = movie.Title;
  movieImage.src = posterHigh;
  switch (movie.rate) {
    case 1:
      stars.innerHTML = "⭐";
      break;
    case 2:
      stars.innerHTML = "⭐⭐";
      break;
    case 3:
      stars.innerHTML = "⭐⭐⭐";
      break;
    case 4:
      stars.innerHTML = "⭐⭐⭐⭐";
      break;
    case 5:
      stars.innerHTML = "⭐⭐⭐⭐⭐";
      break;
    default:
      console.log("error");
  }

  const thisMovie = movies.find((film) => film.id === box.id);
  box.addEventListener("click", () => {
    editOrDone = true;

    createModal(thisMovie);
  });
}

const movieSearchBox = document.getElementById("input");
const searchList = document.getElementById("searchList");
movieSearchBox.addEventListener("focus", () => {
  movieSearchBox.placeholder = "";
  starsEdit = true;
});
movieSearchBox.addEventListener("blur", () => {
  movieSearchBox.placeholder = "Add movie";
});

async function loadMovies(searchTerm) {
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=4679883e`;
  const res = await fetch(`${URL}`);
  const data = await res.json();

  if (data.Response === "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";

  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "images/notfound.jpg";

    movieListItem.innerHTML = `
    <div class="searchItem">
              <div class="itemThumbnail">
                <img
                  src="${moviePoster}"
                />
              </div>
              <div class="itemInfo">
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
              </div>
            </div>`;

    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=4679883e`
      );
      const movieDetails = await result.json();

      createModal(movieDetails);
      //.Title .Poster
    });
  });
}

function updateCurrTab(type) {
  currTab = movies.filter((movie) => movie.type === type);
}

function whiteTab(t) {
  let whiteTab = tabsArray.filter((tab) => tab.id !== t);
  let orangeTab = tabsArray.find((tab) => tab.id === t);
  whiteTab.forEach((tab) => tab.classList.remove("tabSelected"));
  orangeTab.classList.add("tabSelected");
}

function displayTypes() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      boxContainer.innerHTML = "";

      if (tab.id === "All") {
        selectedTab = "All";
        whiteTab(tab.id);
        movies.forEach((movie) => createCards(movie));
      } else if (tab.id === "Movie") {
        selectedTab = "Movie";
        whiteTab(tab.id);
        updateCurrTab("Movie");

        currTab.forEach((movie) => createCards(movie));
      } else if (tab.id === "Anime/Manga") {
        selectedTab = "Anime/Manga";
        whiteTab(tab.id);
        updateCurrTab("Anime/Manga");
        currTab.forEach((movie) => createCards(movie));
      } else if (tab.id === "Series") {
        selectedTab = "Series";
        whiteTab(tab.id);
        updateCurrTab("Series");
        currTab.forEach((movie) => createCards(movie));
      } else if (tab.id === "Game") {
        selectedTab = "Game";
        whiteTab(tab.id);
        updateCurrTab("Game");
        currTab.forEach((game) => createCards(game));
      }
    });
  });
}
displayTypes();

function createModal(movie) {
  modalBodyContainer.innerHTML = "";
  const posterLow = movie.Poster;
  const posterHigh = posterLow.split("@._V1_")[0] + "@.jpg";

  const modalBody = document.createElement("div");
  const modalContainer = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalType = document.createElement("select");
  const typeMovie = document.createElement("option");
  const typeSeries = document.createElement("option");
  const typeGame = document.createElement("option");
  const typeAnime = document.createElement("option");
  const modalName = document.createElement("div");
  const modalExit = document.createElement("img");

  const modalMain = document.createElement("div");
  const mainLeft = document.createElement("div");
  const modalStars = document.createElement("div");
  const star1 = document.createElement("div");
  const star2 = document.createElement("div");
  const star3 = document.createElement("div");
  const star4 = document.createElement("div");
  const star5 = document.createElement("div");
  const mainRight = document.createElement("div");
  const modalNotes = document.createElement("textarea");
  const modalDone = document.createElement("div");
  const modalDelete = document.createElement("div");

  const modalImageBox = document.createElement("div");
  const modalImage = document.createElement("img");

  const starElements = [star1, star2, star3, star4, star5];
  modalName.innerHTML = movie.Title;
  modalNotes.value = editOrDone ? movie.review : "";

  modalExit.innerHTML = "x";
  modalExit.src = "images/arrow.png";
  editOrDone ? (modalNotes.style.pointerEvents = "none") : "auto";
  modalDelete.innerHTML = "delete";
  modalDelete.style.display = "none";

  modalBody.classList.add("modalBody");
  modalContainer.classList.add("modalContainer");
  modalHeader.classList.add("modalHeader");
  modalType.classList.add("modalType");
  modalName.classList.add("modalName");
  modalExit.classList.add("modalExit");

  modalMain.classList.add("modalMain");
  mainLeft.classList.add("mainLeft");
  modalStars.classList.add("modalStars");
  star1.classList.add("stars");
  star2.classList.add("stars");
  star3.classList.add("stars");
  star4.classList.add("stars");
  star5.classList.add("stars");
  modalNotes.classList.add("modalNotes");
  modalDone.classList.add("modalDone");
  modalDelete.classList.add("modalDelete");

  mainRight.classList.add("mainRight");

  modalImageBox.classList.add("modalImageBox");
  modalImage.classList.add("modalImage");

  modalBodyContainer.appendChild(modalBody);
  modalBody.appendChild(modalContainer);
  modalContainer.appendChild(modalHeader);
  modalContainer.appendChild(modalMain);

  modalHeader.appendChild(modalExit);
  modalHeader.appendChild(modalName);
  modalHeader.appendChild(modalType);
  modalType.appendChild(typeMovie);
  modalType.appendChild(typeSeries);
  modalType.appendChild(typeAnime);
  modalType.appendChild(typeGame);

  modalMain.appendChild(mainLeft);
  modalMain.appendChild(mainRight);

  mainLeft.appendChild(modalStars);
  modalStars.appendChild(star1);
  modalStars.appendChild(star2);
  modalStars.appendChild(star3);
  modalStars.appendChild(star4);
  modalStars.appendChild(star5);

  mainLeft.appendChild(modalNotes);
  modalContainer.appendChild(modalDone);
  modalContainer.appendChild(modalDelete);

  mainRight.appendChild(modalImageBox);
  modalImageBox.appendChild(modalImage);
  modalBody.id = "modalBody";

  typeMovie.innerHTML = "Movie";
  typeSeries.innerHTML = "Series";
  typeAnime.innerHTML = "Anime/Manga";
  typeGame.innerHTML = "Game";

  typeMovie.value = "Movie";
  typeSeries.value = "Series";
  typeAnime.value = "Anime/Manga";
  typeGame.value = "Game";

  modalBody.addEventListener("click", (e) => {
    if (e.target.id === "modalBody") {
      modalBody.style.display = "none";
      editOrDone = false;
      starsEdit = false;
    }
  });

  let rating = 0;
  let type = movie.type ? movie.type : "Movie";
  modalType.value = movie.type ? movie.type : "Movie";

  modalType.addEventListener("change", () => {
    type = modalType.value;
  });

  if (starsEdit) {
    modalType.classList.remove("modalTypeNone");
  } else {
    modalType.classList.add("modalTypeNone");
  }

  modalImage.src = posterHigh;

  modalExit.addEventListener("click", function () {
    modalBody.style.display = "none";
    editOrDone = false;
  });

  function renderStars(rate) {
    starElements.forEach((star, index) => {
      star.innerHTML = index < rate ? "⭐" : "☆";
      star.style.color = "white";
    });
  }

  renderStars(movie.rate);

  starElements.forEach((star, index) => {
    const value = index + 1;

    star.addEventListener("mouseenter", () => {
      if (starsEdit) star.style.color = "yellow";
    });
    star.addEventListener("mouseleave", () => {
      renderStars(rating || movie.rate);
    });
    star.addEventListener("click", () => {
      if (starsEdit) {
        rating = value;
        renderStars(rating);
      }
    });
  });

  modalDone.innerHTML = editOrDone ? "Edit" : "Save";
  modalDone.addEventListener("click", () => {
    if (!editOrDone && modalDone.innerHTML === "Save") {
      movies.push({
        Title: movie.Title,
        rate: rating,
        review: modalNotes.value,
        Poster: movie.Poster,
        id: movie.imdbID,
        type: type,
      });
      starsEdit = false;
      localStorage.setItem("movies", JSON.stringify(movies));
      modalBody.style.display = "none";
      modalType.classList.add("modalTypeNone");

      displayCounts();
      boxContainer.innerHTML = "";
      updateCurrTab(type);
      selectedTab === "All"
        ? movies.forEach((movie) => createCards(movie))
        : currTab.forEach(createCards);
    } else if (editOrDone && modalDone.innerHTML === "Edit") {
      modalDelete.style.display = "flex";
      modalNotes.style.pointerEvents = "auto";
      modalDone.innerHTML = "Save";
      starsEdit = true;
      rating = movie.rate;
      modalType.classList.remove("modalTypeNone");
    } else if (editOrDone && modalDone.innerHTML === "Save") {
      const movieIndex = movies.findIndex((film) => film.id === movie.id);
      movies[movieIndex] = {
        ...movies[movieIndex],
        review: modalNotes.value,
        rate: rating,
        type: type,
      };
      localStorage.setItem("movies", JSON.stringify(movies));
      modalBody.style.display = "none";
      boxContainer.innerHTML = "";
      editOrDone = false;
      starsEdit = false;
      selecTab = document.getElementById(movie.type);

      tabsArray.forEach(() => {
        selectedTab !== "All" ? whiteTab(type) : console.log("wat");
      });
      displayCounts();
      updateCurrTab(movies[movieIndex].type);
      selectedTab !== "All"
        ? currTab.forEach((card) => createCards(card))
        : movies.forEach((card) => createCards(card));
    }
  });

  modalDelete.addEventListener("click", () => {
    movies = movies.filter((film) => film.id !== movie.id);
    localStorage.setItem("movies", JSON.stringify(movies));
    modalBody.style.display = "none";
    boxContainer.innerHTML = "";
    updateCurrTab(movie.type);
    selectedTab !== "all"
      ? currTab.forEach((card) => createCards(card))
      : movies.forEach((card) => createCards(card));
    editOrDone = false;
    displayCounts();
  });
}
