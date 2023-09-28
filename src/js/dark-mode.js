const body = document.querySelector('body')
const switchToggle = document.querySelector('#theme-switch-toggle')
// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };

loadingSwitcher();
switchToggle.addEventListener('change', chengeTheme);

function loadingSwitcher() {
    const savedThem = localStorage.getItem('Theme');
    if (savedThem === '.dark-theme') {
      body.classList.add(savedThem);
      switchToggle.checked = true;
    } else {
      body.classList.add('light-theme');
    }
  }


function chengeTheme() {
 body.classList.toggle('.dark-theme');
  body.classList.toggle('.light-theme');

  getCurrentTheme(body.classList);
}

function getCurrentTheme(currentThem) {
  localStorage.setItem('Theme', currentThem);
}

