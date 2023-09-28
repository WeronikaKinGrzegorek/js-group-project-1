import axios from 'axios';
import Notiflix from 'notiflix';
import { showLoader, hideLoader } from './loader'; // Import funkcji obsługujących loader

const apiKey = '55e390226d2f3f6feba5afe684a5a044';

const BASE_API_URL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

export async function fetchMovies(query = '', page = 1) {
  showLoader();
  const searchQuery = query.trim();
  const params = new URLSearchParams({
    api_key: apiKey,
    query: searchQuery,
    page: page,
  });
  const urlSearch = `${BASE_API_URL}search/movie?${params}`;
  const urlPopular = `${BASE_API_URL}movie/popular?${params}`;

  const url = searchQuery ? urlSearch : urlPopular;

  // if (searchQuery === '') {
  //   Notiflix.Notify.failure('Please, enter key word');
  //   return null;
  // }

  try {
    const response = await axios.get(url, options);
    hideLoader();

    return response.data.results;

    // console.log(response.data.results.total_pages);
  } catch (error) {
    console.error('Błąd podczas pobierania fimów:', error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );

    return null;
  }
}
