import { fetchMovies } from "./fetch"

// import './sass/main.scss';
const form = document.querySelector('.search-form')
const searchField = document.querySelector('[name="searchQuery"]')

let page = 1

form.addEventListener('submit', function(event) {
    event.preventDefault()
    const inputValue = searchField.value 
    page = 1
    const movies = fetchMovies(inputValue)
  
})


