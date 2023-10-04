import './js/modal-movie.js';
import './js/add-queue.js';
import './js/add-watchlist.js';
import './js/dark-mode.js';
import './js/draw-movie.js';
import './js/fetch.js';
import './js/fetch-genres.js';
import './js/loader.js';
import './js/modal-close.js';
import './js/modal-team.js';
import './js/clear-search-input.js';
import { drawMovies } from './js/draw-movie';

import './sass/main.scss';

const form = document.querySelector('.search-form');
const searchField = document.querySelector('[name="searchQuery"]');
const moviesGallery = document.querySelector('.gallery__list');

const btnLoadMore = document.getElementById('loadMore');

let inputValue = '';
let currentPage = 0;
const pageSize = 18;

form.addEventListener('submit', function (event) {
  event.preventDefault();
  currentPage = 0;

  inputValue = searchField.value;

  moviesGallery.innerHTML = '';

  drawMovies(inputValue, currentPage, pageSize);
});

drawMovies(searchField.value, currentPage, pageSize);

btnLoadMore.addEventListener('click', () => {
  currentPage++;
  drawMovies(inputValue, currentPage, pageSize);
});
