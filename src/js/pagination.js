
let currentPage = 1
const pageSize = 18

export async function loadMoreMovies(drawMoviesFunction, inputValue, url) {
    try {
      await drawMoviesFunction(inputValue, currentPage, pageSize)
      currentPage++
    } catch (error) {
        console.log(error)
    }
}


