import { fetchMovies } from './fetch.js';
import { fetchGenres } from './fetch-genres.js';

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

const moviesGallery = document.querySelector('.gallery__list');
let page = 1;
const posterArray = [];

export async function drawMovies(inputValue, page = 1) {
  try {
    const genres = await fetchGenres();
    console.log('Genres:', genres);

    const movies = await fetchMovies(inputValue, page);
    console.log(movies);

    if (!movies || movies.length === 0) {
      return;
    }

    const galleryOfMovies = movies
      .map(({ poster_path, genre_ids, id, release_date, title }) => {
        const posterPath = poster_path
          ? `${BASE_POSTER_PATH}${poster_path}`
          : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

        if (!posterArray.includes(posterPath)) {
          posterArray.push(posterPath);
        }

        const genreNames = genre_ids
          .map(genreId => {
            const foundGenre = genres.find(genre => genre.id === genreId);
            return foundGenre ? foundGenre.name : 'Unknown Genre';
          })
          .join(', ');

        return `<li class="gallery__list-item" data-movie-id="${id}">
        <img src="${posterPath}" alt="${title}" movie-id="${id}"/>
        <h3>${title.toUpperCase()}</h3>
        <p>${genreNames} | <span>${release_date.slice(0, 4)}</span></p>
      </li>`;
      })
      .join('');
    moviesGallery.insertAdjacentHTML('beforeend', galleryOfMovies);
  } catch (error) {
    console.error(error);
  }
}
