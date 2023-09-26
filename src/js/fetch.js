import axios from 'axios';
import Notiflix from 'notiflix';

const apiKey = '55e390226d2f3f6feba5afe684a5a044';

const options = {
  method: 'GET',
  headers: { accept: 'application/json' },
};


export async function fetchMovies(query, page = 1, limit = 10) {
  const searchQuery = query.trim();
  const params = new URLSearchParams ({
    api_key: apiKey,
    query: searchQuery,
    page: page,
  })
  if (searchQuery === '') {
    Notiflix.Notify.failure('Please, enter key word');
    return null;
  }
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?${params}`,
      options,
    );
    return response.data;
    console.log(response.data.results.total_pages)
  } catch (error) {
    console.error('Błąd podczas pobierania fimów:', error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return null;
  }
}
