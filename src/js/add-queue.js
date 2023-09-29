import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { displaySavedMovies } from './draw-movie';

const queueButton = document.querySelector('#queueButtonLibrary');
export function addToQueue(movieData) {
  const movieId = movieData.id;
  const isMovieInQueue = queue.some(movieInQueue => {
    if (movieInQueue.id === movieId) {
      return true;
    } else {
      return false;
    }
  });

  if (!isMovieInQueue) {
    queue.push(movieData);
    localStorage.setItem('movieQueue', JSON.stringify(queue));
    Notify.success(`Added movie "${movieData.title}" to queue list.`);
  } else {
    Notify.failure(`Movie "${movieData.title}" is already in queue list.`);
  }
}

export function displayQueue() {
  displaySavedMovies();
}

queueButton.addEventListener('click', () => {
  displayQueue();
});
