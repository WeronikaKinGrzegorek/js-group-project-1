import { showLoader, hideLoader } from './loader.js';
import { addToQueue } from './add-queue';
import { addToWatchlist } from './add-watchlist.js';
import { fetchGenres } from './fetch-genres.js';
import { drawMovies } from './draw-movie.js';
import { getFilmDetails } from './fetch.js';

const modal = document.getElementById('movieModal');
const modalContent = modal.querySelector('.modal-content');
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

const moviesContainer = document.querySelector('.gallery__list');
// const apiKey = '55e390226d2f3f6feba5afe684a5a044';
// const loadMoreButton = document.getElementById('loadMore');
// let currentPage = 1;
// let data;
let movieData;
let genres = [];
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

async function fetchGenreOnce(genreId) {
  if (genres.length === 0) {
    genres = await fetchGenres();
  }
  const foundGenre = genres.find(genre => genre.id === genreId);
  return foundGenre ? foundGenre.name : 'Nieznany';
}

fetchGenreOnce();

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.getFullYear();
}

async function openModal(movieData) {
  modalPoster.src = `https://image.tmdb.org/t/p/w300${movieData.poster_path}`;
  modalPoster.alt = movieData.title;

  modalTitle.textContent = movieData.title.toUpperCase();
  modalRating.textContent = movieData.vote_average;
  modalPopularity.textContent = movieData.popularity;
  modalOriginalTitle.textContent = movieData.original_title;

  const genreIds = movieData.genre_ids;
  const genreNames = genreIds.map(async genreId => await fetchGenreOnce(genreId));
  const resolvedGenreNames = await Promise.all(genreNames);

  modalGenres.textContent = resolvedGenreNames.join(', ');
  modalOverview.textContent = movieData.overview;

  watchedButton.addEventListener('click', watched, true);

  watchlistButton.addEventListener('click', que, true); // dodaj do kolejki

  trailerLink.href = `https://www.youtube.com/results?search_query=${movieData.title}+trailer`;
  modal.style.display = 'block';

  // Dodaj obsługę zdarzenia klawisza "Esc" po otwarciu modala.
  document.addEventListener('keydown', handleEscKey);

  // Dodaj obsługę zamykania modala po kliknięciu w obszar poza nim.
  modal.addEventListener('click', handleAnyOutsideClick);
}

function que() {
  addToQueue(movieData); // dodaj do kolejki
}

function watched() {
  addToWatchlist(movieData);
}

function closeModal() {
  const modal = document.getElementById('movieModal');
  modal.style.display = 'none';

  watchedButton.removeEventListener('click', watched, true);
  watchlistButton.removeEventListener('click', que, true);

  modal.removeEventListener('click', handleAnyOutsideClick);
  // Usuń obsługę zdarzenia klawisza "Esc" po zamknięciu modala.
  document.removeEventListener('keydown', handleEscKey);
}

// Dodaj funkcję obsługującą zdarzenie naciśnięcia klawisza "Esc".
function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
function handleAnyOutsideClick(event) {
  if (event.target === modal) {
    closeModal();
  }
}

export async function handleMovieClick(event) {
  try {
    const movieElement = event.target.closest('.gallery__list-item');
    console.log(movieElement);
    // const libraryMovieElement = event.target.closest('.librarylist-item');

    if (movieElement) {
      const movieId = movieElement.dataset.movieid;
      console.log(movieId);
      movieData = await getFilmDetails(movieId);

      // console.log(getFilmDetails(movieId));

      await openModal(movieData);
    }
  } catch (error) {
    console.error(error);
  }
}
// console.log(movieData);
document.addEventListener('click', handleMovieClick);

const modalCloseButton = document.getElementById('modalCloseButton');
modalCloseButton.addEventListener('click', closeModal);
