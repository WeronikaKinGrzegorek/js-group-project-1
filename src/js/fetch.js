import axios from 'axios';
import Notiflix from 'notiflix';


const apiKey =
  '55e390226d2f3f6feba5afe684a5a044';


const options = {
  method: 'GET',
  headers: { accept: 'application/json' },
};

export async function fetchMovies(query, page = 1) {
  const searchQuery = query.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure('Please, enter key word');
    return null;
  }
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`,
      options,
    );
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania fimów:', error);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return null;
  }
}
