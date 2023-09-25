const modal = document.getElementById('movieModal');
const openBtn = document.getElementById('movieModal');

function openModal() {
  modal.style.display = 'block';

  document.addEventListener('keydown', closeModalOnEsc);

  window.addEventListener('click', closeModalOnClickOutside);
}

function closeModal() {
  modal.style.display = 'none';

  document.removeEventListener('keydown', closeModalOnEsc);

  window.removeEventListener('click', closeModalOnClickOutside);
}

function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeModalOnClickOutside(event) {
  if (event.target === modal) {
    closeModal();
  }
}

openBtn.addEventListener('click', openModal);
