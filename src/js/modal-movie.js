import { addToWatchlist } from './add-watchlist.js';
import { addToQueue } from './add-queue.js';
import { drawMovies } from './draw-movie.js';
import { getFilmDetails } from './fetch.js';

const modal = document.getElementById('movieModal');

const modalPoster = modal.querySelector('#modalPoster');
const modalTitle = modal.querySelector('#modalTitle');
const modalRating = modal.querySelector('#modalRating');
const modalPopularity = modal.querySelector('#modalPopularity');
const modalOriginalTitle = modal.querySelector('#modalOriginalTitle');
const modalGenres = modal.querySelector('#modalGenres');
const modalOverview = modal.querySelector('#modalOverview');
const watchedButton = modal.querySelector('#watchedButton'); // dodaj do obejrzanych
const watchlistButton = modal.querySelector('#watchlistButton'); // dodaj do kolejki
const trailerLink = modal.querySelector('#trailerLink');

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

let movieData;

document.addEventListener('DOMContentLoaded', function () {
  let currentPage = 1;

  const loadMoreMovies = async () => {
    try {
      await drawMovies('', currentPage, 15);
      currentPage++;
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreButton = document.getElementById('loadMore');
  loadMoreButton.addEventListener('click', loadMoreMovies);
});

async function openModal(movieData) {
  const modal = document.getElementById('movieModal');
  const modalContent = modal.querySelector('.modal-content');

  const modalPoster = modal.querySelector('#modalPoster');
  modalPoster.src = `https://image.tmdb.org/t/p/w300${movieData.poster_path}`;
  modalPoster.alt = movieData.title;

  const modalTitle = modal.querySelector('#modalTitle');
  modalTitle.textContent = movieData.title;

  const modalRating = modal.querySelector('#modalRating');
  modalRating.textContent = movieData.vote_average;

  const modalPopularity = modal.querySelector('#modalPopularity');
  modalPopularity.textContent = movieData.popularity;

  const modalOriginalTitle = modal.querySelector('#modalOriginalTitle');
  modalOriginalTitle.textContent = movieData.original_title;

  const genreIds = movieData.genre_ids;
  const genreNames = genreIds.map(async genreId => await fetchGenreOnce(genreId));
  const resolvedGenreNames = await Promise.all(genreNames);
  const modalGenres = modal.querySelector('#modalGenres');
  modalGenres.textContent = resolvedGenreNames.join(', ');
  const modalOverview = modal.querySelector('#modalOverview');
  modalOverview.textContent = movieData.overview;

  const watchedButton = modal.querySelector('#watchedButton');
  watchedButton.addEventListener('click', () => {
    addToWatchlist(movieData);
  });

  const watchlistButton = modal.querySelector('#watchlistButton');
  watchlistButton.addEventListener('click', () => {
    addToQueue(movieData);
  });

  const trailerLink = modal.querySelector('#trailerLink');
  trailerLink.href = `https://www.youtube.com/results?search_query=${movieData.title}+trailer`;

  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('movieModal');
  modal.style.display = 'none';
}

document.addEventListener('click', async event => {
  const movieElement = event.target.closest('.movie');
  if (movieElement) {
    const movieIndex = Array.from(moviesContainer.children).indexOf(movieElement);
    const movieData = data.results[movieIndex];

    openModal(movieData);
  }
});

const modalCloseButton = document.getElementById('modalCloseButton');
modalCloseButton.addEventListener('click', closeModal);

async function fetchMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
  try {
    const response = await fetch(url);
    data = await response.json();

    if (genres.length === 0) {
      genres = await fetchGenres();
    }

    for (const movie of data.results) {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const genreNames = await Promise.all(
        movie.genre_ids.map(async genreId => await fetchGenreOnce(genreId)),
      );

      const releaseYear = formatDate(movie.release_date);

      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Genre: ${genreNames.join(', ')}</p>
        <p>Release Year: ${releaseYear}</p>
      `;
      moviesContainer.appendChild(movieElement);
    }

    currentPage++;
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
  }
}

loadMoreButton.addEventListener('click', fetchMovies);

fetchMovies();
