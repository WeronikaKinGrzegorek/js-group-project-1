import { showLoader, hideLoader } from './js/loader'; // Import funkcji obsługujących loader

import { fetchMovies } from './js/fetch';
import { drawMovies } from './js/draw-movie';
import { handleMovieClick } from './js/modal-movie';

import './sass/main.scss';

const form = document.querySelector('.search-form');
const searchField = document.querySelector('[name="searchQuery"]');
const moviesGallery = document.querySelector('.gallery__list');
const btnLoadMore = document.getElementById('loadMore');
let inputValue = ''

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputValue = searchField.value;
  page = 1;

  showLoader(); // Pokaż loader przed rozpoczęciem wyszukiwania filmów

  const movies = fetchMovies(inputValue);
  console.log(movies);
  moviesGallery.innerHTML = '';
  drawMovies(inputValue);

  hideLoader(); // Ukryj loader po zakończeniu wyszukiwania filmów
});

btnLoadMore.addEventListener('click', async () => {
  page += 1;
  const movies = await fetchMovies(inputValue, page)
  if(movies && movies.results && movies.results.length > 0) {
    drawMovies(inputValue, true)
  } else {
    btnLoadMore.disabled = true;
    btnLoadMore.textContent = 'No More Movies'
  }
})

