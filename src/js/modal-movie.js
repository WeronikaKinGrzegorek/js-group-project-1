import { showLoader, hideLoader } from './loader.js';
import { addToQueue } from './add-queue';
import { addToWatchlist } from './add-watchlist.js';
import { fetchGenres } from './fetch-genres.js';
import { drawMovies } from './draw-movie.js';
import { fetchMovies } from './fetch.js';

const moviesContainer = document.querySelector('.gallery__list');
// const apiKey = '55e390226d2f3f6feba5afe684a5a044';
// const loadMoreButton = document.getElementById('loadMore');
// let currentPage = 1;
// let data;
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
  const modal = document.getElementById('movieModal');
  const modalContent = modal.querySelector('.modal-content');
  const modalPoster = modal.querySelector('#modalPoster');
  modalPoster.src = `https://image.tmdb.org/t/p/w300${movieData.poster_path}`;
  modalPoster.alt = movieData.title;
  const modalTitle = modal.querySelector('#modalTitle');
  modalTitle.textContent = movieData.title.toUpperCase();
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

  // Dodaj obsługę zdarzenia klawisza "Esc" po otwarciu modala.
  document.addEventListener('keydown', handleEscKey);

  // Dodaj obsługę zamykania modala po kliknięciu w obszar poza nim.
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('movieModal');
  modal.style.display = 'none';

  // Usuń obsługę zdarzenia klawisza "Esc" po zamknięciu modala.
  document.removeEventListener('keydown', handleEscKey);
}

// Dodaj funkcję obsługującą zdarzenie naciśnięcia klawisza "Esc".
function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

export async function handleMovieClick(event) {
  try {
    const moviesDetails = await fetchMovies();
    console.log(moviesDetails);
    const movieElement = event.target.closest('.gallery__list-item');

    if (movieElement) {
      const movieIndex = Array.from(moviesContainer.children).indexOf(movieElement);
      console.log(movieIndex);
      const movieData = moviesDetails[movieIndex];

      openModal(movieData);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('click', handleMovieClick);

const modalCloseButton = document.getElementById('modalCloseButton');
modalCloseButton.addEventListener('click', closeModal);