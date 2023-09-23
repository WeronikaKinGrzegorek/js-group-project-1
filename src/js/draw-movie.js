import { fetchMovies } from './fetch';
import { fetchGenres } from './fetch-genres';

// const BASE_API_URL = 'https://api.themoviedb.org/3';

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

const moviesGallery = document.querySelector('.movies__list');

export async function drawMovies(inputValue) {
  const genres = await fetchGenres();
  console.log('Genres:', genres);
  const movies = await fetchMovies(inputValue);

  if (!movies.results || movies.results.length === 0) {
    return;
  }

  const movieList = movies.results
    .map(({ backdrop_path, genre_ids, id, release_date, title }) => {
      const posterPath = backdrop_path
        ? `${BASE_POSTER_PATH}${backdrop_path}`
        : 'https://via.placeholder.com/500x750';

      const genreNames = genre_ids
        .map(genreId => {
          const foundGenre = genres.find(genre => genre.id === genreId);
          return foundGenre ? foundGenre.name : 'Unknown Genre';
        })
        .join(', ');

      return `<li class="movies__list-item">
        <img src="${posterPath}" alt="${title}" movie-id="${id}"/>
        <h2>${title}</h2>
        <p>${genreNames} | <span>${release_date.slice(0, 4)}</span></p>
      </li>`;
    })
    .join('');

  moviesGallery.insertAdjacentHTML('beforeend', movieList);
}
