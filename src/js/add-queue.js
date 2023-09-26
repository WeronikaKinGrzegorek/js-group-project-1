import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { drawMovies } from './draw-movie';

const addToQueueButton = document.querySelector('#watchlistButton');
const queueButton = document.querySelector('#queueButton');
const apiKey = '55e390226d2f3f6feba5afe684a5a044';
const queue = JSON.parse(localStorage.getItem('movieQueue')) || [];

function addToQueue(movieId) {
  const movie = movies.find(movie => movie.id === movieId);
  const isMovieInQueue = queue.some(movieInQueue => movieInQueue.id === movieId);

  if (!isMovieInQueue) {
    queue.push(movie);
    localStorage.setItem('movieQueue', JSON.stringify(queue));
    Notify.success(`Added movie "${movie.title}" to queue list.`);
  } else {
    Notify.failure(`Movie "${movie.title}" is already in queue list.`);
  }
}

addToQueueButton.addEventListener('click', async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey);
    const data = await response.json();
    movies = data.results;

    movies.forEach(movie => {
      const movieId = movie.id;
      addToQueue(movieId);
    });
    Notify.success('All movies added to the queue list.');
  } catch (error) {
    Notify.failure('Error while fetching movies:', error);
  }
});

function displayQueue(movie) {
  drawMovies(movie);
}

queueButton.addEventListener('click', () => {
  displayQueue(queue);
});
