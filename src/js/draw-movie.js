import {
  fetchMovies
} from './fetch';
import {
  fetchGenres
} from './fetch-genres';


// const BASE_API_URL = 'https://api.themoviedb.org/3';

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

const moviesGallery = document.querySelector('.gallery__list');
let page = 1;

export async function drawMovies(inputValue, append = false) {




export async function drawMovies(inputValue, append = false) {
  const genres = await fetchGenres();
  console.log('Genres:', genres);
  if (typeof inputValue !== 'string') {
    inputValue = inputValue.toString();
  }

  const movies = await fetchMovies(inputValue, page);

  if (!movies.results || movies.results.length === 0) {
    return;
  }

  const movieList = movies.results
    .map(({
      poster_path,
      genre_ids,
      id,
      release_date,
      title
    }) => {
      const posterPath = poster_path ?
        `${BASE_POSTER_PATH}${poster_path}` :
        'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

      const genreNames = genre_ids
        .map(genreId => {
          const foundGenre = genres.find(genre => genre.id === genreId);
          return foundGenre ? foundGenre.name : 'Unknown Genre';
        })
        .join(', ');

      return `<li class="gallery__list-item">
        <img src="${posterPath}" alt="${title}" movie-id="${id}"/>
        <h3>${title.toUpperCase()}</h3>
        <p>${genreNames} | <span>${release_date.slice(0, 4)}</span></p>
      </li>`;

    })
    .join('');

  if (append) {
    moviesGallery.insertAdjacentHTML('beforeend', movieList);
  } else {

    moviesGallery.innerHTML = movieList;
  }
}
