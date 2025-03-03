import dotenv from 'dotenv';

//const apiKey = "0b97ae755635b4fb0228560ce5710f15";
dotenv.config();

const apiKey = process.env.API_KEY;
// Fetch popular movies when the page loads
document.addEventListener("DOMContentLoaded", fetchPopularMovies);

// Fetch popular movies from TMDB API
//This function is triggered when page loads
function fetchPopularMovies() {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  fetch(popularUrl)
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
    })
    .catch((error) => {
      displayErrorMessage(
        "Failed to fetch popular movies. Please try agin later"
      );
      console.error("Error fetching popular movies:", error);
    });
}

// Fetch movies based on user's search input
//Triggered when user clicks the search button

function fetchMovies() {
  const searchTerm = document.querySelector("#searchInput").value;

  if (searchTerm === "") {
    displayErrorMessage("Please enter a movie name");
    return;
  }
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    searchTerm
  )}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        displayMovies(data.results);
      } else {
        displayErrorMessage("No movies found.");
      }
    })
    .catch((error) => {
      displayErrorMessage(
        "Error fetching search results. Please try again later"
      );
      console.error("Error fetching search results:", error);
    });
}

// Display movies in the container
function displayMovies(movies) {
  const container = document.querySelector("#movie-container");
  container.innerHTML = ""; // Clear previous movies

  //Loop through the list of movies
  movies.forEach((movie) => {
    //Creating a new div element for the movie card
    const movieDiv = document.createElement("div");
    movieDiv.classList.add(
      "movie-card",
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "p-4",
      "hover:shadow-lg",
      "transition-shadow"
    ); //Add a CSS class for styling

    //Create the image element for the movie poster
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "placeholder-image-url"; //Fallback if there's no poster
    const img = document.createElement("img");
    img.src = posterPath;
    img.alt = `${movie.title} Poster`;
    img.classList.add("w-full", "h-auto"); //Ensure proper image sizing

    //Create a title element for the movie title
    const title = document.createElement("h2");
    title.textContent = movie.title;
    title.classList.add("text-xl", "font-bold", "mt-4");

    //Create a paragraph for release date
    const releaseDate = document.createElement("p");
    releaseDate.textContent = `Release Date: ${
      movie.release_date || "Unknown"
    }`;
    releaseDate.classList.add("text-gray-600");

    //Create a paragraph for rating
    const rating = document.createElement("p");
    rating.textContent = `Rating: ${movie.vote_average || "N/A"}`;
    rating.classList.add("text-yellow-500", "font-semibold");

    //Create a button to add movie to favorites
    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Add to Favorites";
    favoriteButton.classList.add(
      "bg-blue-500",
      "text-white",
      "py-2",
      "px-4",
      "rounded"
    );
    favoriteButton.addEventListener("click", () => addToFavorites(movie));

    //Append all elements to the container
    movieDiv.appendChild(img);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(rating);
    movieDiv.appendChild(favoriteButton);

    //Append movie card to the container
    container.appendChild(movieDiv);
  });
}

// Add movie to favorites and save to localStorage
//Alerts the user if movie is already in favorites

function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the movie is already in favorites
  const movieExists = favorites.some((fav) => fav.id === movie.id);

  if (!movieExists) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${movie.title} added to favorites!`);
  } else {
    alert(`${movie.title} is already in your favorites!`);
  }
}
//Displays an error message to the user
function displayErrorMessage(message) {
  const container = document.querySelector("#movie-container");
  container.innerHTML = `<p class="text-red-500 text-center">${message}</p>`;
}
// Add event listener to search button
document.querySelector("#searchButton").addEventListener("click", fetchMovies);
