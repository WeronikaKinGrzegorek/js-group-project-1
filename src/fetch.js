import Notiflix from "notiflix"
import axios from 'axios'
const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWUzOTAyMjZkMmYzZjZmZWJhNWFmZTY4NGE1YTA0NCIsInN1YiI6IjY1MGM3MmMyZjkyNTMyMDE0ZDJiMjQ1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R-PdhHXDZEWVXb9HEvduDEusd2Wp6OjpLsAIEjIomLU"

const options = {
    method: "GET",
    headers: {'accept': 'application/json'}
}

export async function fetchMovies(query, page = 1) {
    const searchQuery = query.trim()
    
    if(searchQuery === '') {
   Notiflix.Notify.failure('Please, enter key word')
   return null
    }
} try {
const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`, options)
return response.data
} catch (error) {
    console.error('Błąd podczas pobierania fimów:', error);
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    return null
}

