import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  params: { language: 'en', api_key: '55e390226d2f3f6feba5afe684a5a044' },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 55e390226d2f3f6feba5afe684a5a044',
  },
};

export async function fetchGenres() {
  try {
    const result = await axios.request(options);
    return result.data.genres;
  } catch (error) {
    console.error(error);
  }
}
