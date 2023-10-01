import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  params: {
    language: 'en',
    api_key: '55e390226d2f3f6feba5afe684a5a044',
  },
  headers: {
    accept: 'application/json',
    Authorization: '55e390226d2f3f6feba5afe684a5a044',
  },
};

let genres = null;

export async function fetchGenres() {
  if (genres) {
    return genres;
  }
  try {
    const result = await axios.request(options);
    genres = result.data.genres;
    return genres;
  } catch (e) {
    console.error(e);
    return [];
  }
}
