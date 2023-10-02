
let currentPage = 1
const pageSize = 18

export async function loadMoreMovies(drawMoviesFunction, inputValue) {
    try {
        currentPage++
      await drawMoviesFunction(inputValue, currentPage, pageSize)
    } catch (error) {
        console.log(error)
    }
}


