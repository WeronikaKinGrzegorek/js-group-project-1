import { fetchMovies } from './fetch.js';
import { fetchGenres } from './fetch-genres.js';

// Stała z bazowym adresem plakatów filmowych
const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

// Elementy DOM
const moviesGallery = document.querySelector('.gallery__list');

// Tablica do przechowywania adresów plakatów filmowych
const posterArray = [];

// Funkcja do rysowania filmów
export async function drawMovies(moreMovies, inputValue, page = 1, pageSize = 18) {
  try {
    // Pobierz listę gatunków filmowych
    const genres = await fetchGenres();
    console.log(genres);

    let movies;

    // Pobierz filmy z API
    if (moreMovies.length > 0) {
      movies = moreMovies; //await fetchMovies(inputValue, page);
    } else {
      movies = await fetchMovies(inputValue, page);
    }
    console.log(movies);
    // Przetwórz filmy i dodaj je do galerii
    const galleryOfMovies = movies
      .slice(0, pageSize)
      .map(({ poster_path, genre_ids, id, release_date, title, vote_average }) => {
        const posterPath = poster_path
          ? `${BASE_POSTER_PATH}${poster_path}`
          : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';
        if (!posterArray.includes(posterPath)) {
          posterArray.push(posterPath);
        }
        // const voteAverage = vote_average.slice(0, 3);
        const genreNames = genre_ids
          .map(genreId => {
            const foundGenre = genres.find(genre => genre.id === genreId);
            return foundGenre ? foundGenre.name : 'Unknown Genre';
          })
          .join(',');

        return `<li class="gallery__list-item" data-movieid="${id}">
          <img src="${posterPath}" alt="${title}" movie-id="${id}"/>
          <h3>${title.toUpperCase()}</h3>
          <p>${genreNames} | <span>${release_date.slice(0, 4)}</span></p>
                </li>`;
      });
    const desktopGallery = [];
    for (let i = 0; i < galleryOfMovies.length; i += 3) {
      desktopGallery.push(galleryOfMovies.slice(i, i + 3).join(''));
    }


    moviesGallery.insertAdjacentHTML('beforeend', desktopGallery.join(''));
  } catch (error) {
    console.error(error);
  }
}
