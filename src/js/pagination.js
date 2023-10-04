


export async function loadMoreMovies(drawMoviesFunction, inputValue, currentPage, pageSize) {
    try {
        await drawMoviesFunction(inputValue, currentPage, pageSize)
        currentPage++
    } catch (error) {
        console.log(error)
    }

}

// document.addEventListener('DOMContentLoaded', function () {
//   let currentPage = 1;

//   const loadMoreMovies = async () => {
//     try {
//       await drawMovies('', currentPage, 15);
//       currentPage++;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const loadMoreButton = document.getElementById('loadMore');
//   loadMoreButton.addEventListener('click', loadMoreMovies);
// });
