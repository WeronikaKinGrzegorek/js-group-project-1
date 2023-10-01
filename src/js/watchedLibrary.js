// попередня версія поберає фільми з локального сховища
// export function displayWatchedMovies() {
//   const watchedMovies = JSON.parse(localStorage.getItem('movieWatchlist')) || [];
//   const moviesContainer = document.querySelector('.library-gallery');
//   moviesContainer.innerHTML = '';
//   watchedMovies.forEach(movieData => {
//     const movieElement = createMovieElement(movieData);
//     moviesContainer.appendChild(movieElement);
//   });
// }

import { addToWatchlist } from './add-watchlist.js';

// версія коли беруться дані з API
export function displayWatchedMovies() {
  const watchedMovies = JSON.parse(localStorage.getItem('movieWatchlist')) || [];
  console.log(watchedMovies);
  const moviesContainer = document.querySelector('.library-gallery');
  moviesContainer.innerHTML = '';

  watchedMovies.forEach(async movieData => {
    // Використовуйте функцію fetchMovies або інші методи для отримання додаткової інформації про фільм
    const additionalMovieInfo = await fetchMovieInfo(movieData.id);

    // Об'єднайте інформацію про фільм та додаткову інформацію, якщо вона доступна
    const combinedMovieData = {
      ...movieData,
      ...additionalMovieInfo,
    };

    // Створіть елемент фільму на основі комбінованих даних
    const movieElement = createMovieElement(combinedMovieData);
    moviesContainer.appendChild(movieElement);
  });
}

async function fetchMovieInfo(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list/${movieId}`);
    const data = await response.json();
    // Обробіть дані та поверніть їх
    return data;
  } catch (error) {
    console.error(error);
    return {}; // Поверніть порожній об'єкт у разі помилки
  }
}

// варіант коли функція створює розмітку html
// function renderLibrary(storageContent) {
//   const moviesContainer = document.querySelector('.library-gallery'); // Отримайте контейнер, куди потрібно вставити HTML-розмітку
//   moviesContainer.innerHTML = ''; // Очистіть контейнер перед вставкою нового вмісту

//   storageContent.forEach(({ id, poster_path, title, genres, release_date }) => {
//     // Створіть HTML-елемент для кожного фільму
//     const movieElement = createMovieElement({
//       id,
//       poster_path,
//       title,
//       vote_average: '', // Додайте ваш рейтинг фільму, якщо він доступний
//     });

//     // Додайте фільмовий елемент в контейнер
//     moviesContainer.appendChild(movieElement);
//   });
// }

// // Функція createMovieElement, яку ви вже маєте
// function createMovieElement(movieData) {
//   const movieElement = document.createElement('li');
//   movieElement.classList.add(''); // Додайте необхідні класи для стилізації

//   const movieLink = document.createElement('a');
//   movieLink.href = '#';
//   movieLink.classList.add(''); // Додайте класи для стилізації посилання

//   const movieImage = document.createElement('div');
//   movieImage.classList.add(''); // Додайте класи для стилізації зображення
//   movieImage.innerHTML = `<img id="${movieData.id}" src="${IMG_URL + movieData.poster_path}" alt="${
//     movieData.title
//   }" />`;

//   const movieInfo = document.createElement('div');
//   movieInfo.classList.add(''); // Додайте класи для стилізації інформації про фільм
//   movieInfo.innerHTML = `
//     <h2>${movieData.title}</h2>
//     <p>${movieData.vote_average ? `Рейтинг: ${movieData.vote_average}` : ''}</p>
//     <p>${movieData.genres ? movieData.genres.join(', ') : ''} | ${
//     movieData.release_date ? movieData.release_date.slice(0, 4) : ''
//   }</p>
//   `;

//   // Додайте всі елементи до DOM
//   movieLink.appendChild(movieImage);
//   movieLink.appendChild(movieInfo);
//   movieElement.appendChild(movieLink);

//   return movieElement;
// }

function createMovieElement(movieData) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');
  const movieImage = document.createElement('img');
  movieImage.src = movieData.poster_path;
  movieImage.alt = movieData.title;
  const movieTitle = document.createElement('h2');
  movieTitle.textContent = movieData.title;
  const movieRating = document.createElement('p');
  movieRating.textContent = `Średnia ocena: ${movieData.vote_average}`;

  movieElement.appendChild(movieImage);
  movieElement.appendChild(movieTitle);
  movieElement.appendChild(movieRating);

  return movieElement;
}

const watchedButton = document.getElementById('watchedButtonLibrary');
watchedButton.addEventListener('click', () => {
  displayWatchedMovies();
});

// function renderLibrary(storageContent) {
//   const markup = storageContent
//     .map(({ id, poster_path, title, genres, release_date }) => {
//       return `<li class="" data-id="${id}">
//         <a href="#" class="" data-id="${id}">
//           <div class="">
//             <img class="" id="${id}" src="${IMG_URL + poster_path}" alt="${title}" />
//           </div>
//           <div class="">
//             <h2 class="">${title}</h2>
//             <p class="">${genres.map(({ name }) => name).join(', ')} | ${release_date.slice(
//         0,
//         4,
//       )}</p>
//           </div>
//         </a>
//       </li>`;
//     })
//     .join('');

//   // Отримайте контейнер, куди потрібно вставити HTML-розмітку
//   const moviesContainer = document.querySelector('.library');

//   // Вставте HTML-розмітку в контейнер
//   moviesContainer.innerHTML = markup;
// }
