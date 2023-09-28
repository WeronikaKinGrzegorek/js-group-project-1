import axios from 'axios';
import Notiflix from 'notiflix';
import { showLoader, hideLoader } from './loader'; // Import funkcji obsługujących loader

const apiKey = '55e390226d2f3f6feba5afe684a5a044';
const BASE_API_URL = 'https://api.themoviedb.org/3/';

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

  try {
    const response = await axios.get(url);
    hideLoader();

    return response.data.results;
  } catch (error) {
    console.error('Błąd podczas pobierania fimów:', error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );

    return null;
  }
}

let genres = null;
export async function fetchGenres() {
  if (genres) {
    return genres;
  }
  try {
    const genresUrl = `${BASE_API_URL}genre/movie/list?api_key=${apiKey}`;
    const result = await axios.get(genresUrl);
    genres = result.data.genres;
    return genres;
  } catch (e) {
    console.error(e);
    return [];
  }
}
