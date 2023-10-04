const goitLink = document.getElementById('goit-link');
const modalTeam = document.getElementById('teamModal');
const closeBtn = document.querySelector('.close-modal-button');

goitLink.addEventListener('click', function (event) {
  event.preventDefault();
  modalTeam.style.display = 'block';
});

function closeTeamModal() {
  modalTeam.style.display = 'none';
}

closeBtn.addEventListener('click', closeTeamModal);

window.addEventListener('click', function (event) {
  if (event.target === modalTeam) {
    closeTeamModal();
  }
});
