import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { displaySavedMovies } from './draw-movie';

const queueButton = document.querySelector('#queueButtonLibrary');
const savedMovies = JSON.parse(localStorage.getItem('movieQueue')) || [];
const containerOfSavedMovies = document.querySelector('.library');
const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

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

async function displaySavedMovies(savedMovies) {
  try {
    containerOfSavedMovies.innerHTML = '';
    const galleryOfSavedMovies = savedMovies
      .map(({ poster_path, genres, id, release_date, title, vote_average }) => {
        const posterPath = poster_path
          ? `${BASE_POSTER_PATH}${poster_path}`
          : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

        const queueMovieGenres = genres;

        const genreNames = queueMovieGenres
          .map(genre => {
            return genre.name ? genre.name : 'Unknown Genre';
          })
          .join(', ');
        const voteAverage = vote_average.toFixed(1);
        return `<li class="library__list-item" data-movie-id="${id}">
            <img src="${posterPath}" alt="${title}" movie-id="${id}"/>
            <h3>${title.toUpperCase()}</h3>
            <p>${genreNames} | <span>${release_date}</span></p><div class="vote-average">${voteAverage}</div>
          </li>`;
      })
      .join('');

    containerOfSavedMovies.insertAdjacentHTML('beforeend', galleryOfSavedMovies);
  } catch (error) {
    console.error(error);
  }
}

queueButton.addEventListener('click', () => {
  displaySavedMovies(savedMovies);
});
