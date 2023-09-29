import { fetchMovies } from './fetch.js';
import { fetchGenres } from './fetch-genres.js';

// Stała z bazowym adresem plakatów filmowych
const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

// Elementy DOM
const moviesGallery = document.querySelector('.gallery__list');

// Tablica do przechowywania adresów plakatów filmowych
const posterArray = [];

// Funkcja do rysowania filmów
export async function drawMovies(inputValue, page = 1, pageSize = 18) {
  try {
    // Pobierz listę gatunków filmowych
    const genres = await fetchGenres();

    // Pobierz filmy z API
    const movies = await fetchMovies(inputValue, page);

    // Sprawdź czy filmy istnieją i czy są niepuste
    if (!movies || movies.length === 0) {
      return;
    }

    // Przetwórz filmy i dodaj je do galerii
    movies.slice(0, pageSize).forEach(({ poster_path, genre_ids, id, release_date, title }) => {
      const posterPath = poster_path
        ? `${BASE_POSTER_PATH}${poster_path}`
        : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

      if (!posterArray.includes(posterPath)) {
        posterArray.push(posterPath);
        const genreNames = genre_ids
          .map(genreId => {
            const foundGenre = genres.find(genre => genre.id === genreId);
            return foundGenre ? foundGenre.name : 'Unknown Genre';
          })
          .join(', ');

        const movieItem = document.createElement('li');
        movieItem.classList.add('gallery__list-item');
        movieItem.dataset.movieId = id;
        movieItem.innerHTML = `
          <img src="${posterPath}" alt="${title}" movie-id="${id}" />
          <h3>${title.toUpperCase()}</h3>
          <p>${genreNames} | <span>${release_date.slice(0, 4)}</span></p>
        `;

        moviesGallery.appendChild(movieItem);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function displaySavedMovies() {
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
