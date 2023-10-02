import { addToQueue } from './add-queue';
import { addToWatchlist } from './add-watchlist.js';
import { fetchGenres } from './fetch-genres.js';
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
//const popularity = movieData.popularity.toFixed(0);
//const averageVote = movieData.vote_average.toFixed(1);

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
  console.log(movieData);
  const posterPath = movieData.poster_path
    ? `${BASE_POSTER_PATH}${movieData.poster_path}`
    : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

  modalPoster.src = posterPath;
  modalPoster.alt = movieData.title;

  modalTitle.textContent = movieData.title.toUpperCase();
  modalRating.textContent = `${movieData.vote_average} / ${movieData.vote_count}`;
  modalPopularity.textContent = movieData.popularity;
  modalOriginalTitle.textContent = movieData.original_title;

  const genres = movieData.genres;

  const genreNames = genres
    .map(genre => {
      return genre.name ? genre.name : 'Unknown Genre';
    })
    .join(', ');

  modalGenres.textContent = genreNames;

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

      await openModal(movieData);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('click', handleMovieClick);

const modalCloseButton = document.getElementById('modalCloseButton');
modalCloseButton.addEventListener('click', closeModal);
