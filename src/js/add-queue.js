import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { handleMovieClick } from './modal-movie';

const addToQueueButton = document.querySelector('#watchlistButton');
const queueButton = document.querySelector('#queueButton');
const apiKey = '55e390226d2f3f6feba5afe684a5a044';
let queue = JSON.parse(localStorage.getItem('movieQueue')) || [];
let movies = [];

export function addToQueue(movieData) {
  const movieId = movieData.id;
  const isMovieInQueue = queue.some(movieInQueue => movieInQueue.id === movieId);

  if (!isMovieInQueue) {
    queue.push(movieData);
    localStorage.setItem('movieQueue', JSON.stringify(queue));
    Notify.success(`Added movie "${movieData.title}" to queue list.`);
  } else {
    Notify.failure(`Movie "${movieData.title}" is already in queue list.`);
  }
}

addToQueueButton.addEventListener('click', async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey);
    const data = await response.json();
    movies = data.results;

    movies.forEach(movie => {
      addToQueue(movie);
    });
    Notify.success(`Added movie "${movieData.title}" to queue list.`);
  } catch (error) {
    Notify.failure('Error while fetching movies:', error);
  }
});

export function displayQueue() {
  console.log(queue);
}

queueButton.addEventListener('click', () => {
  displayQueue(queue);
});
