import { deleteNotes } from "../localStorageOperations.js";
// URL for movie poster images
const imgUrl = "https://image.tmdb.org/t/p/w500";
// Select the movie list container
const movieList = document.querySelector("#movie-list");

// Display movie cards of the favorite movies chosen on the home page
const FavouriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];

// Iterate through each favorite movie
for (const data of FavouriteMovies) {
  // Create the favorite movie card element
  const movieCard = document.createElement("div");
  movieCard.classList.add(
    "movie-card",
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-4",
    "hover:shadow-lg",
    "transition-shadow"
  );

  // Create the favorite movie image element to place inside the card
  const moviePoster = document.createElement("img");
  moviePoster.classList.add("w-full", "rounded");
  moviePoster.src = imgUrl + data.poster_path;
  moviePoster.alt = data.title;

  // Create the button element for adding notes through the favorite movie card
  const addNotesBtn = document.createElement("button");
  addNotesBtn.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "mr-2"
  );
  addNotesBtn.textContent = "Add Notes";
  //create a button to remove the notes added against a movie
  const deleteNotesBtn = document.createElement("button");
  deleteNotesBtn.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "mr-2"
  );
  deleteNotesBtn.textContent = "Delete Notes";

  // create a button for updating the notes added against a movie
  const updateNotesBtn = document.createElement("button");
  updateNotesBtn.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded"
  );
  updateNotesBtn.textContent = "Update Notes";

  // Create the favorite movie title element for the card
  const movieTitle = document.createElement("div");
  movieTitle.classList.add("text-lg", "font-bold", "pt-1");
  movieTitle.innerText = data.title;

  // Create the favorite movie element for displaying the movie release date
  const movieReleaseDate = document.createElement("div");
  movieReleaseDate.classList.add("text-base", "pb-0.5");
  movieReleaseDate.innerText = "Release Date: " + data.release_date;

  // Create the favorite movie element for displaying the movie rating
  const movieRating = document.createElement("div");
  movieRating.classList.add("text-yellow-500");
  movieRating.innerText = "Rating: " + data.vote_average;

  // Iterate through the notes array to display the notes for the favorite movie
  const MyFavouriteMovieNotes =
    JSON.parse(localStorage.getItem("MyNotes")) || [];
  const movieNotes = document.createElement("div");
  for (const note of MyFavouriteMovieNotes) {
    if (note.noteTitle === data.title && note.myNotes !== null) {
      movieNotes.innerText = movieNotes.innerText + " " + note.myNotes;
    }
  }
  movieNotes.classList.add("text-base", "pb-0.5", "italic", "font-serif");
  movieNotes.innerText = "My Notes: " + movieNotes.innerText;

  // Build the card as it should be displayed
  movieList.appendChild(movieCard);
  movieCard.appendChild(moviePoster);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieReleaseDate);
  movieCard.appendChild(movieRating);
  movieCard.appendChild(movieNotes);
  movieCard.appendChild(addNotesBtn);
  movieCard.appendChild(deleteNotesBtn);
  movieCard.appendChild(updateNotesBtn);

  // On the event of clicking the add notes button, show a prompt to allow users to enter notes
  addNotesBtn.addEventListener("click", () => {
    let notes = window.prompt(
      "Please add your notes about your favorite movie: " +
        moviePoster.alt +
        " here: ",
      "your notes"
    );

    // Check if notes were entered
    if (notes !== null) {
      console.log(`My notes on ${moviePoster.alt}: ` + notes);
      console.log("Testing notes: ", notes);
      const obj = { noteTitle: moviePoster.alt, myNotes: notes };
      const FavouriteMovieNotes =
        JSON.parse(localStorage.getItem("MyNotes")) || [];
      FavouriteMovieNotes.push(obj);
      localStorage.setItem("MyNotes", JSON.stringify(FavouriteMovieNotes));
      const link = document.createElement("a");
      const paragraph = document.createElement("p");
      link.classList.add("hover:underline");
      link.innerText = "Click here to refresh screen to see your notes";
      link.href = "journal.html";
      movieCard.appendChild(paragraph);
      movieCard.appendChild(link);
    } else {
      console.log("No notes");
    }
  });

  // on event of clicking the delete notes button, delete the notes added against a movie
  deleteNotesBtn.addEventListener("click", () => {
    
    console.log("Delete notes button clicked");
    deleteNotes(moviePoster.alt);
    const link = document.createElement("a");
    const paragraph = document.createElement("p");
    link.classList.add("hover:underline");
    link.innerText = "Click here to refresh screen to see your notes disappear";
    link.href = "journal.html";
    movieCard.appendChild(paragraph);
    movieCard.appendChild(link);
  });


  // on event of clicking the update notes button, update the notes added against a movie
  updateNotesBtn.addEventListener("click", () => {
    let notes = window.prompt(
      "Please update your notes about your favorite movie: " +
        moviePoster.alt +
        " here: ",
      "your notes"
    );
    if (notes !== null) {
      console.log(`My notes on ${moviePoster.alt}: ` + notes);
      console.log("Testing notes: ", notes);
      const obj = { noteTitle: moviePoster.alt, myNotes: notes };
      const FavouriteMovieNotes =
        JSON.parse(localStorage.getItem("MyNotes")) || [];
      const updatedNotes = FavouriteMovieNotes.filter(
        (note) => note.noteTitle !== moviePoster.alt
      );
      updatedNotes.push(obj);
      localStorage.setItem("MyNotes", JSON.stringify(updatedNotes));
      const link = document.createElement("a");
      const paragraph = document.createElement("p");
      link.classList.add("hover:underline");
      link.innerText = "Click here to refresh screen to see your notes updated";
      link.href = "journal.html";
      movieCard.appendChild(paragraph);
      movieCard.appendChild(link);
    } else {
      console.log("No notes");
    }
  });
}
