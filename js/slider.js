/* eslint-disable no-plusplus */
// import '../scss/slider.scss';
import pets from './pets';

import createCard from './card';

let carouselTimeout;
let cardsQuantity;
let prevClick;
let displayedPets = [];
let prevState = [];

const cardsList = document.querySelector('.cards__list');
const prevBtn = document.querySelector('.cards__nav--prev');
const nextBtn = document.querySelector('.cards__nav--next');

function calculateCardsQuantity() {
  if (window.innerWidth <= 720) {
    cardsQuantity = 1;
    carouselTimeout = 200;
  } else if (window.innerWidth < 1000) {
    cardsQuantity = 2;
    carouselTimeout = 300;
  } else {
    cardsQuantity = 3;
    carouselTimeout = 400;
  }
}

function generatePetCards() {
  const filteredPets = pets.filter((pet) => !prevState.includes(pet));
  while (displayedPets.length < cardsQuantity) {
    const rndNum = Math.floor(Math.random() * filteredPets.length);
    if (!displayedPets.includes(filteredPets[rndNum])) {
      displayedPets.push(filteredPets[rndNum]);
    }
  }
}

function showPetCards() {
  cardsList.innerHTML = '';
  for (let i = 0; i < cardsQuantity; i++) {
    if (!displayedPets[i]) {
      break;
    }
    const li = createCard(displayedPets[i]);
    cardsList.appendChild(li);
    // createModal(li);
  }
}

function handleCarouselClicks(btn, prevClickedBtn, slide) {
  btn.setAttribute('disabled', 'disabled');
  btn.setAttribute('style', 'background-color: #f6f6f6');

  if (prevClick === prevClickedBtn) {
    const temp = [...displayedPets];
    displayedPets.length = 0;
    displayedPets = prevState;
    prevState = temp;
  } else {
    prevState = [...displayedPets];
    displayedPets.length = 0;
    generatePetCards();
  }
  prevClick = btn;

  cardsList.classList.add(slide);
  setTimeout(() => {
    cardsList.classList.remove(slide);
    cardsList.classList.add('scale');
    showPetCards();
    setTimeout(() => {
      cardsList.classList.remove('scale');
      btn.removeAttribute('disabled');
      btn.removeAttribute('style');
    }, carouselTimeout);
  }, carouselTimeout);
}

prevBtn.addEventListener('click', () =>
  handleCarouselClicks(prevBtn, nextBtn, 'prevSlide')
);

nextBtn.addEventListener('click', () => {
  handleCarouselClicks(nextBtn, prevBtn, 'nextSlide');
});

function slider() {
  calculateCardsQuantity();
  generatePetCards();
  showPetCards();
}

export default slider;
