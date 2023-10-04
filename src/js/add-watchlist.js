import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

// const watchedButton = document.querySelector('#watchedButtonLibrary');
let watchlist = JSON.parse(localStorage.getItem('movieWatchlist')) || [];
console.log(watchlist);
export function addToWatchlist(movieData) {
  const movieId = movieData.id;
  const isMovieInWatchlist = watchlist.some(movieInWatchlist => {
    if (movieInWatchlist.id === movieId) {
      return true;
    } else {
      return false;
    }
  });

  if (!isMovieInWatchlist) {
    watchlist.push(movieData);
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
    Notify.success(`Added movie "${movieData.title}" to watched.`);
  } else {
    Notify.failure(`Movie "${movieData.title}" is already in watched.`);
  }
}

export function isMovieInWatched(movieData) {
  const watchedMovieId = movieData.id;
  return watchlist.some(movieInWatchlist => movieInWatchlist.id === watchedMovieId);
}
export function removeFromWatched(movieData) {
  const watchedMovieId = movieData.id;
  const isMovieInWatched = watchlist.some(
    movieInWatchlist => movieInWatchlist.id === watchedMovieId,
  );

  if (isMovieInWatched) {
    const watchedMovieIndex = watchlist.findIndex(movie => movie.id === watchedMovieId);
    watchlist.splice(watchedMovieIndex, 1);
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
    Notify.success(`Removed movie "${movieData.title}" from watchlist.`);

    // delete movie card after removing from queue
    const movieCard = document.querySelector(
      `.gallery__list-item[data-movieid="${watchedMovieId}"]`,
    );
    if (movieCard) {
      movieCard.remove();
    }
  } else {
    Notify.failure(`Movie "${movieData.title}" is not in watchlist.`);
  }
}
