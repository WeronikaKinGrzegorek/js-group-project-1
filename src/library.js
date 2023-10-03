import './js/loader.js';
import './js/dark-mode';
import './sass/main.scss';
import './js/modal-team';
import './js/add-queue';
import './js/add-watchlist';
import './js/watchedLibrary';
import './js/queueLibrary';
import { showLoader, hideLoader } from './js/loader.js';

import './js/modal-movie';

import { displayWatchedMovies } from './js/watchedLibrary.js';

const watchedMovies = JSON.parse(localStorage.getItem('movieWatchlist')) || [];

document.addEventListener('DOMContentLoaded', function () {
  showLoader();
  displayWatchedMovies(watchedMovies);
  hideLoader();
});
