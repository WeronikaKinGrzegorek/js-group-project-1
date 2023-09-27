import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
<<<<<<< Updated upstream
  params: { language: 'en', api_key: '55e390226d2f3f6feba5afe684a5a044' },
=======
  params: {
    language: 'en',
    api_key: '55e390226d2f3f6feba5afe684a5a044',
  },
>>>>>>> Stashed changes
  headers: {
    accept: 'application/json',
    Authorization: '55e390226d2f3f6feba5afe684a5a044',
  },
};

let genres = null;

export async function fetchGenres() {
  if (genres) {
    return genres; // Gatunki pobrane sa zwracane z pamieci podrecznej
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
