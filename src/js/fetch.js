import axios from 'axios';
import Notiflix from 'notiflix';
import { hideLoader } from './loader'; // Import funkcji obsługujących loader

const apiKey = '55e390226d2f3f6feba5afe684a5a044';
const BASE_API_URL = 'https://api.themoviedb.org/3/';

export async function fetchMovies(query = '', page = 1) {
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

export async function getFilmDetails(movieId) {
  const options = {
    method: 'GET',
    url: `${BASE_API_URL}movie/${movieId}?api_key=${apiKey}`,
    params: { language: 'en-US' },
    headers: { accept: 'application/json' },
  };
  return axios.request(options).then(response => response.data);
}

export async function fetchSearchMovies (query = '', page = 1) {
  const searchQuery = query.trim();

  const params = new URLSearchParams({
    api_key: apiKey,
    query: searchQuery,
    page: page,
  });

  const urlSearch = `${BASE_API_URL}search/movie?${params}`;

  try {
    const response = await axios.get(urlSearch);
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