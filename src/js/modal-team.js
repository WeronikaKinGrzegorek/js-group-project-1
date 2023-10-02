const goitLink = document.getElementById('goit-link');
const modal = document.getElementById('teamModal');
const closeBtn = document.querySelector('.close-modal-button');

goitLink.addEventListener('click', function (event) {
  event.preventDefault();
  modal.style.display = 'block';
});

function closeTeamModal() {
  modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeTeamModal);

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeTeamModal();
  }
});
