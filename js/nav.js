const close = document.getElementById('close');
const expand = document.getElementById('expand');
const nav = document.querySelector('nav');

close.addEventListener('click', () => {
  nav.classList.remove("active");
});

expand.addEventListener('click', () => {
  nav.classList.add("active");
});
