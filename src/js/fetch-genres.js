import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  params: { language: 'en' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWUzOTAyMjZkMmYzZjZmZWJhNWFmZTY4NGE1YTA0NCIsInN1YiI6IjY1MGM3MmMyZjkyNTMyMDE0ZDJiMjQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R-PdhHXDZEWVXb9HEvduDEusd2Wp6OjpLsAIEjIomLU',
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
