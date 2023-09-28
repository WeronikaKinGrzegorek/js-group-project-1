const IMG_URL = 'https://image.tmdb.org/t/p/w300';

const watchedButton = document.querySelector('.watchedButtonLibrary');
export const libraryEl = document.querySelector('.library');

let isWatchTabActive = true;

if (libraryEl) {
  watchedButton.addEventListener('click', handleClickWatched);
}

const getFromStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
  }
};

renderSavedFilms('watch');

export function handleClickWatched() {
  renderSavedFilms('watch');
  isWatchTabActive = true;
}

export function renderSavedFilms(name) {
  clearFilmList();
  const storageMovies = getFromStorage(name);
  if (storageMovies) {
    renderLibrary(storageMovies);
  }
}

function renderLibrary(storageContent) {
  const markup = storageContent
    .map(({ id, poster_path, title, genres, release_date }) => {
      return `<li class="" data-id="${id}">
    <a href="#" class="" data-id="${id}"><div class="">
    <img class="" id="${id}" src="${IMG_URL + poster_path}
    "alt="${title}" /></div><div class="">
    <h2 class="">${title}</h2>
    <p class="">${genres.map(({ name }) => name).join(', ')} | ${release_date.slice(0, 4)}</p>
    </div></a></li>`;
    })
    .join('');

  if (libraryEl) {
    libraryEl.innerHTML = markup;
  }
}

// if (libraryEl) {
//   libraryEl.addEventListener('click', handleMovieClick); // add to modal-movie
// }
