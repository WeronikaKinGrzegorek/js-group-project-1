import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { displaySavedMovies } from './draw-movie';

const queueButton = document.querySelector('#queueButtonLibrary');
export function addToQueue(movieData) {
  const movieId = movieData.id;
  const isMovieInQueue = queue.some(movieInQueue => {
    if (movieInQueue.id === movieId) {
      return true;
    } else {
      return false;
    }
  });

  if (!isMovieInQueue) {
    queue.push(movieData);
    localStorage.setItem('movieQueue', JSON.stringify(queue));
    Notify.success(`Added movie "${movieData.title}" to queue list.`);
  } else {
    Notify.failure(`Movie "${movieData.title}" is already in queue list.`);
  }
}

export function displayQueue() {
  console.log(queue);
}

queueButton.addEventListener('click', () => {
  displayQueue(queue);
});

async function displaySavedMovies() {
  try {
    const genres = await fetchGenres();
    console.log('Genres:', genres);
    const savedMovies = JSON.parse(localStorage.getItem('movieQueue')) || [];
    const containerOfSavedMovies = document.querySelector('.library');
    containerOfSavedMovies.innerHTML = '';

    const galleryOfSavedMovies = savedMovies
      .map(({ poster_path, genre_ids, id, release_date, title }) => {
        const posterPath = poster_path
          ? `${BASE_POSTER_PATH}${poster_path}`
          : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

        if (!posterArray.includes(posterPath)) {
          posterArray.push(posterPath);
        }
        const movieTitle = title ? title.toUpperCase() : 'Unknown Title';
        const genreNames = genre_ids
          ? genre_ids
              .map(genreId => {
                const foundGenre = genres.find(genre => genre.id === genreId);
                return foundGenre ? foundGenre.name : 'Unknown Genre';
              })
              .join(', ')
          : 'Unknown Genre';
        const movieReleaseDate = release_date ? release_date.slice(0, 4) : 'Unknown Release Date';
        return `<li class="library__list-item" data-movie-id="${id}">
            <img src="${posterPath}" alt="${movieTitle}" movie-id="${id}"/>
            <h3>${movieTitle}</h3>
            <p>${genreNames} | <span>${movieReleaseDate}</span></p>
          </li>`;
      })
      .join('');

    containerOfSavedMovies.insertAdjacentHTML('beforeend', galleryOfSavedMovies);
  } catch (error) {
    console.error(error);
  }
}
