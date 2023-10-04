import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const savedMovies = JSON.parse(localStorage.getItem('movieQueue')) || [];

export function addToQueue(movieData) {
  const movieId = movieData.id;
  const isMovieInQueue = savedMovies.some(movieInQueue => {
    if (movieInQueue.id === movieId) {
      return true;
    } else {
      return false;
    }
  });

  if (!isMovieInQueue) {
    savedMovies.push(movieData);
    localStorage.setItem('movieQueue', JSON.stringify(savedMovies));
    Notify.success(`Added movie "${movieData.title}" to queue list.`);
  } else {
    Notify.failure(`Movie "${movieData.title}" is already in queue list.`);
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function isMovieInQueue(movieData) {
  const movieId = movieData.id;
  return savedMovies.some(movieInQueue => movieInQueue.id === movieId);
}

export function removeFromQueue(movieData) {
  const movieId = movieData.id;
  const isMovieInQueue = savedMovies.some(movieInQueue => movieInQueue.id === movieId);

  if (isMovieInQueue) {
    const movieIndex = savedMovies.findIndex(movie => movie.id === movieId);
    savedMovies.splice(movieIndex, 1);
    localStorage.setItem('movieQueue', JSON.stringify(savedMovies));
    Notify.success(`Removed movie "${movieData.title}" from queue list.`);

    // delete movie card after removing from queue
    const movieCard = document.querySelector(`.gallery__list-item[data-movieid="${movieId}"]`);
    if (movieCard) {
      movieCard.remove();
    }
  } else {
    Notify.failure(`Movie "${movieData.title}" is not in the queue.`);
  }
}
//~~~~~~~~~~~~~~~~~~~~~
