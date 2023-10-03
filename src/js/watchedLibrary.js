import {
  showLoader,
  hideLoader
} from './loader';

const watchedMovies = JSON.parse(localStorage.getItem('movieWatchlist')) || [];
console.log(watchedMovies);
const watchedMoviesList = document.querySelector('.library');
const watchedButton = document.getElementById('watchedButtonLibrary');

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

export async function displayWatchedMovies(watchedMovies) {
  try {
    watchedMoviesList.innerHTML = '';

    const galleryOfWatchedMovies = watchedMovies.map(
      ({
        poster_path,
        genres,
        genre_ids,
        id,
        release_date,
        title,
        vote_average
      }) => {
        const posterPath = poster_path ?
          `${BASE_POSTER_PATH}${poster_path}` :
          'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

        const watchedMovieGenres = genres ? genres : genre_ids;

        const genreNames = watchedMovieGenres
          .map(genre => {
            return genre.name ? genre.name : 'Unknown Genre';
          })
          .join(', ');

        const voteAverage = vote_average.toFixed(1);

        return `<li class="library-item gallery__list-item" data-movieid="${id}">
      <img src="${posterPath}" alt="${title}" movie-id="${id}"/>
      <h3>${title.toUpperCase()}</h3>
      <p>${genreNames} | <span>${release_date.slice(0, 4)}</span></p>
    <div class="vote-average">${voteAverage}</div>
    </li>`;
      },
    );

    watchedMoviesList.insertAdjacentHTML('beforeend', galleryOfWatchedMovies);
  } catch (error) {
    console.error(error);
  }
}

watchedButton.addEventListener('click', () => {
  showLoader();
  displayWatchedMovies(watchedMovies);
  hideLoader();
});