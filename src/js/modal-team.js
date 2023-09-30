const goitLink = document.getElementById('goit-link');
const modal = document.getElementById('teamModal');
const closeBtn = document.querySelector('.close-button');

goitLink.addEventListener('click', function (event) {
  event.preventDefault();
  modal.style.display = 'block';
});

export function closeModal() {
  modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal());

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
