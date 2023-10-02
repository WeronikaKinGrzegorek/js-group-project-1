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

