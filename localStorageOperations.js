export const deleteNotes = (movieTitle) => {
  const MyFavouriteMovieNotes = JSON.parse(localStorage.getItem("MyNotes")) || [];
  const updatedNotes = MyFavouriteMovieNotes.filter(
    (note) => note.noteTitle !== movieTitle
  );
  localStorage.setItem("MyNotes", JSON.stringify(updatedNotes));
}