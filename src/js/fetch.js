import axios from 'axios';
import Notiflix from 'notiflix';
import {
  showLoader,
  hideLoader
} from './loader'; // Import funkcji obsługujących loader

const apiKey = '55e390226d2f3f6feba5afe684a5a044';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  },
};

export async function fetchMovies(query, page = 1) {
  const searchQuery = query.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure('Please, enter key word');
    return null;
  }

  showLoader(); // Pokaż loader przed rozpoczęciem żądania

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`,
      options,
    );

    hideLoader(); // Ukryj loader po zakończeniu żądania

    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania fimów:', error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );

    hideLoader(); // Ukryj loader w przypadku błędu

    return null;
  }
}