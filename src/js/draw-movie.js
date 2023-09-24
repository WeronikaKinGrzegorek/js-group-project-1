import { fetchMovies } from './fetch';
import { fetchGenres } from './fetch-genres';

// const BASE_API_URL = 'https://api.themoviedb.org/3';

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

const moviesGallery = document.querySelector('.gallery__list');

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
        : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

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

  moviesGallery.insertAdjacentHTML('beforeend', movieList);
}
