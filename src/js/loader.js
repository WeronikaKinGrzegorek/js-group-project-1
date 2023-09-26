const loaderContainer = document.querySelector('.loader-container');

export function showLoader() {
  loaderContainer.style.display = 'flex';
  console.log("hello")
}

export function hideLoader() {
  loaderContainer.style.display = 'none';
  console.log("bye")
}