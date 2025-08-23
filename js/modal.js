const open = document.getElementById('main-action');
const hide = document.getElementById('exit');
const popup = document.querySelector('.popup-outer');

open.addEventListener('click', () => {
  popup.classList.add("active");
});

hide.addEventListener('click', () => {
  popup.classList.remove("active");
});
