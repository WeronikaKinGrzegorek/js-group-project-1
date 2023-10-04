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
import {
  loadMoreMovies
} from './js/pagination';

const form = document.querySelector('.search-form');
const searchField = document.querySelector('[name="searchQuery"]');
const moviesGallery = document.querySelector('.gallery__list');

const btnLoadMore = document.getElementById('loadMore');
btnLoadMore.style.display = 'none';

let currentQuery = '';
let inputValue = '';
let currentPage = 1;
const pageSize = 18;

form.addEventListener('submit', function (event) {
  event.preventDefault();
  currentQuery = searchField.value;
  inputValue = currentQuery;

  moviesGallery.innerHTML = '';

  drawMovies(inputValue);
  btnLoadMore.style.display = 'block';
});

btnLoadMore.addEventListener('click', () => {
  loadMoreMovies(drawMovies, searchField.value, currentPage, pageSize);
});

drawMovies(searchField.value);