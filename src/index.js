import { fetchMovies } from './js/fetch';
import { drawMovies } from './js/draw-movie'; 

import './sass/main.scss';

const form = document.querySelector('.search-form');
const searchField = document.querySelector('[name="searchQuery"]');

const moviesGallery = document.querySelector('.gallery__list');

let page = 1;

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputValue = searchField.value;
  page = 1;
  const movies = fetchMovies(inputValue);
  console.log(movies);
  moviesGallery.innerHTML = '';
  drawMovies(inputValue);
});
