const watchedMovies = JSON.parse(localStorage.getItem('movieWatchlist')) || [];
console.log(watchedMovies);
const watchedMoviesList = document.querySelector('.library');
const watchedButton = document.getElementById('watchedButtonLibrary');

const BASE_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

export async function displayWatchedMovies(watchedMovies) {
  try {
    watchedMoviesList.innerHTML = '';

    const galleryOfWatchedMovies = watchedMovies.map(
      ({ poster_path, genres, id, release_date, title, vote_average }) => {
        const posterPath = poster_path
          ? `${BASE_POSTER_PATH}${poster_path}`
          : 'https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg';

        const watchedMoviesGenres = genres;

        const genreNames = watchedMoviesGenres
          .map(genre => {
            return genre.name ? genre.name : 'Unknown Genre';
          })
          .join(', ');

        const voteAverage = vote_average.toFixed(1);

        return `<li class="library-item" data-movieid="${id}">
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
  displayWatchedMovies(watchedMovies);
});

// async function fetchMovieInfo(movieId) {
//   try {
//     const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list/${movieId}`);
//     const data = await response.json();
//     // Обробіть дані та поверніть їх
//     return data;
//   } catch (error) {
//     console.error(error);
//     return {}; // Поверніть порожній об'єкт у разі помилки
//   }
// }

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

// function createMovieElement(movieData) {
//   const movieElement = document.createElement('div');
//   movieElement.classList.add('movie');
//   const movieImage = document.createElement('img');
//   movieImage.src = movieData.poster_path;
//   movieImage.alt = movieData.title;
//   const movieTitle = document.createElement('h2');
//   movieTitle.textContent = movieData.title;
//   const movieRating = document.createElement('p');
//   movieRating.textContent = `Średnia ocena: ${movieData.vote_average}`;

//   movieElement.appendChild(movieImage);
//   movieElement.appendChild(movieTitle);
//   movieElement.appendChild(movieRating);

//   return movieElement;
// }

// const watchedButton = document.getElementById('watchedButtonLibrary');
// watchedButton.addEventListener('click', () => {
//   displayWatchedMovies();
// });

// // function renderLibrary(storageContent) {
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
