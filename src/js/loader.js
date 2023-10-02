const loaderContainer = document.querySelector('.loader-container');

export function showLoader() {
  loaderContainer.style.display = 'flex';
}

export function hideLoader() {
  loaderContainer.style.display = 'none';
}