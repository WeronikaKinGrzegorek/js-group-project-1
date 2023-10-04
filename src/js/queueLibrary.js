import { showLoader, hideLoader } from './loader';

const savedMovies = JSON.parse(localStorage.getItem('movieQueue')) || [];
console.log(savedMovies);
const savedMoviesList = document.querySelector('.library');
const queueButton = document.getElementById('queueButtonLibrary');

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

export async function displaySavedMovies(savedMovies) {
  try {
    savedMoviesList.innerHTML = '';

    const galleryOfSavedMovies = savedMovies.map(
      ({ poster_path, genres, genre_ids, id, release_date, title, vote_average }) => {
        const posterPath = poster_path
          ? `${BASE_POSTER_PATH}${poster_path}`
          : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

        const savedMovieGenres = genres ? genres : genre_ids;

        const genreNames = savedMovieGenres
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

    savedMoviesList.insertAdjacentHTML('beforeend', galleryOfSavedMovies);
  } catch (error) {
    console.error(error);
  }
}

queueButton.addEventListener('click', () => {
  showLoader();
  displaySavedMovies(savedMovies);
  hideLoader();
});
