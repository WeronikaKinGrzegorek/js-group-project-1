const body = document.querySelector('body')
const container = document.querySelector('.container')
const switchToggle = document.querySelector('#theme-switch-toggle')

loadingSwitcher();
switchToggle.addEventListener('change', chengeTheme);

function chengeTheme() {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
  
   
     getCurrentTheme(body.classList);
   }


function getCurrentTheme(currentThem) {
  localStorage.setItem('Theme', currentThem);
}

function loadingSwitcher() {
   
     const savedThem = localStorage.getItem('Theme');
    if (savedThem === 'light-theme') {
      body.classList.add(savedThem);
      switchToggle.checked = true;
    } else {
      body.classList.add('dark-theme');
    }
  }