const input = document.getElementById("input");
const boxContainer = document.getElementById("boxContainer");
const body = document.getElementById("body");

const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

const movies = [];
let editOrDone = false;
movies.push(...savedMovies);

movies.forEach((movie) => createCards(movie));

// input.addEventListener("keydown", function (e) {
//   if (e.key === "Enter" && input.value !== "") {
//     createModal();
//   } else if (e.key === "Enter" && input.value === "") {
//     alert("Insert movie name");
//   }
// });

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

  box.id = movie.id;
  boxName.innerHTML = movie.Title;
  movieImage.src = movie.Poster;
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
      console.log(movieDetails);
      createModal(movieDetails);
      //.Title .Poster
    });
  });
}

function createModal(movie) {
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

  const modalImageBox = document.createElement("div");
  const modalImage = document.createElement("img");

  modalName.innerHTML = movie.Title;
  modalNotes.value = movie.review;
  star1.innerHTML = "☆";
  star2.innerHTML = "☆";
  star3.innerHTML = "☆";
  star4.innerHTML = "☆";
  star5.innerHTML = "☆";
  modalDone.innerHTML = "DONE";
  modalExit.innerHTML = "x";
  modalExit.src = "images/arrow.png";

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

  mainRight.appendChild(modalImageBox);
  modalImageBox.appendChild(modalImage);

  let rating = 0;

  modalImage.src = movie.Poster;

  modalExit.addEventListener("click", function () {
    modalBody.style.display = "none";
    editOrDone = false;
  });

  function starRate(rate) {
    if (editOrDone === false) {
      star1.addEventListener("mouseenter", () => {
        star1.style.color = "yellow";
      });
      star1.addEventListener("mouseleave", () => {
        star1.style.color = "white";
      });
      star1.addEventListener("click", () => {
        star1.innerHTML = "⭐";
        star2.innerHTML = "☆";
        star3.innerHTML = "☆";
        star4.innerHTML = "☆";
        star5.innerHTML = "☆";
        rating = 1;
        const all = document.querySelectorAll(".star");
        all.forEach((el) => {
          el.style.fontSize = "30px";
        });
      });

      // ONE STAR

      star2.addEventListener("mouseenter", () => {
        star1.style.color = "yellow";
        star2.style.color = "yellow";
      });
      star2.addEventListener("mouseleave", () => {
        star1.style.color = "white";
        star2.style.color = "white";
      });
      star2.addEventListener("click", () => {
        star1.innerHTML = "⭐";
        star2.innerHTML = "⭐";
        star3.innerHTML = "☆";
        star4.innerHTML = "☆";
        star5.innerHTML = "☆";
        rating = 2;
        const all = document.querySelectorAll(".star");
        all.forEach((el) => {
          el.style.fontSize = "30px";
        });
      });

      // TWO STARS
      star3.addEventListener("mouseenter", () => {
        star1.style.color = "yellow";
        star2.style.color = "yellow";
        star3.style.color = "yellow";
      });
      star3.addEventListener("mouseleave", () => {
        star1.style.color = "white";
        star2.style.color = "white";
        star3.style.color = "white";
      });
      star3.addEventListener("click", () => {
        star1.innerHTML = "⭐";
        star2.innerHTML = "⭐";
        star3.innerHTML = "⭐";
        star4.innerHTML = "☆";
        star5.innerHTML = "☆";
        rating = 3;
        const all = document.querySelectorAll(".star");
        all.forEach((el) => {
          el.style.fontSize = "30px";
        });
      });
      // THREE STARS

      star4.addEventListener("mouseenter", () => {
        star1.style.color = "yellow";
        star2.style.color = "yellow";
        star3.style.color = "yellow";
        star4.style.color = "yellow";
      });

      star4.addEventListener("mouseleave", () => {
        star1.style.color = "white";
        star2.style.color = "white";
        star3.style.color = "white";
        star4.style.color = "white";
      });
      star4.addEventListener("click", () => {
        star1.innerHTML = "⭐";
        star2.innerHTML = "⭐";
        star3.innerHTML = "⭐";
        star4.innerHTML = "⭐";
        star5.innerHTML = "☆";
        rating = 4;
        const all = document.querySelectorAll(".star");
        all.forEach((el) => {
          el.style.fontSize = "30px";
        });
      });
      //  FOUR STARS

      star5.addEventListener("mouseenter", () => {
        star1.style.color = "yellow";
        star2.style.color = "yellow";
        star3.style.color = "yellow";
        star4.style.color = "yellow";
        star5.style.color = "yellow";
      });
      star5.addEventListener("mouseleave", () => {
        star1.style.color = "white";
        star2.style.color = "white";
        star3.style.color = "white";
        star4.style.color = "white";
        star5.style.color = "white";
      });
      star5.addEventListener("click", () => {
        star1.innerHTML = "⭐";
        star2.innerHTML = "⭐";
        star3.innerHTML = "⭐";
        star4.innerHTML = "⭐";
        star5.innerHTML = "⭐";
        rating = 5;
        const all = document.querySelectorAll(".star");
        all.forEach((el) => {
          el.style.fontSize = "30px";
        });
      });
    } else {
      switch (rate) {
        case 1:
          star1.innerHTML = "⭐";
          star2.innerHTML = "☆";
          star3.innerHTML = "☆";
          star4.innerHTML = "☆";
          star5.innerHTML = "☆";
          break;
        case 2:
          star1.innerHTML = "⭐";
          star2.innerHTML = "⭐";
          star3.innerHTML = "☆";
          star4.innerHTML = "☆";
          star5.innerHTML = "☆";
          break;
        case 3:
          star1.innerHTML = "⭐";
          star2.innerHTML = "⭐";
          star3.innerHTML = "⭐";
          star4.innerHTML = "☆";
          star5.innerHTML = "☆";
          break;
        case 4:
          star1.innerHTML = "⭐";
          star2.innerHTML = "⭐";
          star3.innerHTML = "⭐";
          star4.innerHTML = "⭐";
          star5.innerHTML = "☆";
          break;
        case 5:
          star1.innerHTML = "⭐";
          star2.innerHTML = "⭐";
          star3.innerHTML = "⭐";
          star4.innerHTML = "⭐";
          star5.innerHTML = "⭐";
          break;
      }
    }
    // FIVE STARS
  }
  starRate(movie.rate);

  modalDone.innerHTML = editOrDone ? "Edit" : "Done";
  modalDone.addEventListener("click", () => {
    movies.push({
      Title: movie.Title,
      rate: rating,
      review: modalNotes.value,
      Poster: movie.Poster,
      id: movie.imdbID,
    });

    localStorage.setItem("movies", JSON.stringify(movies));
    modalBody.style.display = "none";

    const thisMovie = movies.find((film) => film.Title === movie.Title);
    createCards(thisMovie);
  });
}
