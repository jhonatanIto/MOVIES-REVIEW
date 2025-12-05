const boxContainer = document.getElementById("boxContainer");
const body = document.getElementById("body");

const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

let movies = [];
let editOrDone = false;
let starsEdit = false;

movies.push(...savedMovies);

movies.forEach((movie) => createCards(movie));

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
    console.log(movie);

    createModal(thisMovie);
  });
}

const movieSearchBox = document.getElementById("input");
const searchList = document.getElementById("searchList");
movieSearchBox.addEventListener("click", () => {
  starsEdit = true;
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

function createModal(movie) {
  const posterLow = movie.Poster;
  const posterHigh = posterLow.split("@._V1_")[0] + "@.jpg";
  console.log(posterLow);
  console.log(posterHigh);

  const modalBody = document.createElement("div");
  const modalContainer = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalExitRight = document.createElement("div");
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
  modalExitRight.classList.add("modalExitLeft");
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

  body.appendChild(modalBody);
  modalBody.appendChild(modalContainer);
  modalContainer.appendChild(modalHeader);
  modalContainer.appendChild(modalMain);

  modalHeader.appendChild(modalExit);
  modalHeader.appendChild(modalName);
  modalHeader.appendChild(modalExitRight);

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

  modalBody.addEventListener("click", (e) => {
    if (e.target.id === "modalBody") {
      modalBody.style.display = "none";
      editOrDone = false;
      starsEdit = false;
    }
  });

  let rating = 0;

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
      });
      starsEdit = false;
      localStorage.setItem("movies", JSON.stringify(movies));
      modalBody.style.display = "none";

      const thisMovie = movies.find((film) => film.Title === movie.Title);
      createCards(thisMovie);
    } else if (editOrDone && modalDone.innerHTML === "Edit") {
      modalDelete.style.display = "flex";
      modalNotes.style.pointerEvents = "auto";
      modalDone.innerHTML = "Save";
      starsEdit = true;
      rating = movie.rate;
    } else if (editOrDone && modalDone.innerHTML === "Save") {
      const movieIndex = movies.findIndex((film) => film.id === movie.id);
      movies[movieIndex] = {
        ...movies[movieIndex],
        review: modalNotes.value,
        rate: rating,
      };

      localStorage.setItem("movies", JSON.stringify(movies));
      modalBody.style.display = "none";
      boxContainer.innerHTML = "";
      editOrDone = false;
      starsEdit = false;
      movies.forEach(createCards);
    }
  });

  modalDelete.addEventListener("click", () => {
    movies = movies.filter((film) => film.id !== movie.id);
    localStorage.setItem("movies", JSON.stringify(movies));
    modalBody.style.display = "none";
    boxContainer.innerHTML = "";
    movies.forEach(createCards);
    editOrDone = false;
  });
}
