// import './scss/style.scss';
// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.js';

const burgerBtn = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const bg = document.querySelector('.bg');

function handleBurgerShow() {
  burgerBtn.classList.toggle('burger--active');
  menu.classList.toggle('nav--active');
  document.body.classList.toggle('lock');
  bg.classList.toggle('bg--active');
}

bg.addEventListener('click', () => {
  handleBurgerShow();
});

burgerBtn.addEventListener('click', () => {
  handleBurgerShow();
});

menu.addEventListener('click', (e) => {
  if (menu.classList.contains('nav--active')) {
    if (e.target.classList.contains('menu__link')) {
      setTimeout(() => {
        handleBurgerShow();
      }, 100);
    }
  }
});
