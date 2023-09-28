import { fetchMovies } from './js/fetch';
import { drawMovies } from './js/draw-movie';
import { fetchMovieDetails } from './js/fetch';
import { showLoader, hideLoader } from './js/loader';
import './js/dark-mode';
import './sass/main.scss';

const form = document.querySelector('.search-form');
const searchField = document.querySelector('[name="searchQuery"]');
const moviesGallery = document.querySelector('.gallery__list');

const btnLoadMore = document.getElementById('loadMore');

let inputValue = '';

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputValue = searchField.value;

  moviesGallery.innerHTML = '';
  drawMovies(inputValue);

  hideLoader(); // Ukryj loader po zakończeniu wyszukiwania filmów
});

btnLoadMore.addEventListener('click', async () => {
  page += 1;
  const moreMovies = await fetchMovies(inputValue, page);
  if (moreMovies && moreMovies.length > 0) {
    drawMovies(inputValue, true);
  } else {
    btnLoadMore.disabled = true;
    btnLoadMore.textContent = 'No More Movies';
  }
});

drawMovies(inputValue);
