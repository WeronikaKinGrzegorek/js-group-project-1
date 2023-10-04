

export async function loadMoreMovies(drawMoviesFunction, inputValue, currentPage, pageSize) {
    try {
        await drawMoviesFunction(inputValue, currentPage, pageSize)
        currentPage++
    } catch (error) {
        console.log(error)
    }
}


