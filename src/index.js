import { fetchMovies } from './js/fetch';
import { drawMovies } from './js/draw-movie';
import { fetchMovieDetails } from './js/fetch';
import { showLoader, hideLoader } from './js/loader';
import './js/dark-mode';
import './sass/main.scss';
import { closeModal } from './js/modal-team';
import { handler, loadMoreMovies} from './js/pagination';

const form = document.querySelector('.search-form');
const searchField = document.querySelector('[name="searchQuery"]');
const moviesGallery = document.querySelector('.gallery__list');

const btnLoadMore = document.getElementById('loadMore');
btnLoadMore.style.display = 'none'

let currentQuery = ''
let inputValue = ''

form.addEventListener('submit', function (event) {
  event.preventDefault();
  currentQuery = searchField.value
  inputValue = currentQuery
  
  moviesGallery.innerHTML = '';
  drawMovies(inputValue);
  btnLoadMore.style.display = 'block'

  hideLoader(); // Ukryj loader po zakończeniu wyszukiwania filmów
});

btnLoadMore.addEventListener('click', () => {
 
loadMoreMovies(drawMovies, searchField.value)
})

drawMovies(searchField.value)
