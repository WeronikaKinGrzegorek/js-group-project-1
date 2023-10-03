const input = document.querySelector('.search-form-input')


input.addEventListener('focus', clearInput);
input.addEventListener('click', clearInput);
input.addEventListener('submit', clearInput);

function clearInput() {
    input.value = '';
}