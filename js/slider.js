import pets from './pets';
import createCard from './card';
import createModal from './modal';

let cardsQuantity;
let resizedCardsQuantity;
let prevClick;
let displayedPets = [];
let prevState = [];

const cardsList = document.querySelector('.cards__list');
const prevBtn = document.querySelector('.cards__nav--prev');
const nextBtn = document.querySelector('.cards__nav--next');

function calculateCardsQuantity() {
  if (window.innerWidth <= 720) {
    cardsQuantity = 1;
  } else if (window.innerWidth < 1000) {
    cardsQuantity = 2;
  } else {
    cardsQuantity = 3;
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
  for (let i = 0; i < cardsQuantity; i += 1) {
    if (!displayedPets[i]) {
      break;
    }
    const li = createCard(displayedPets[i]);
    cardsList.appendChild(li);
    li.addEventListener('click', () => {
      createModal(li);
    });
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

  cardsList.addEventListener('animationend', () => {
    cardsList.classList.remove(slide);
    showPetCards();
    btn.removeAttribute('disabled');
    btn.removeAttribute('style');
  });
}

prevBtn.addEventListener('click', () =>
  handleCarouselClicks(prevBtn, nextBtn, 'prevSlide')
);

nextBtn.addEventListener('click', () => {
  handleCarouselClicks(nextBtn, prevBtn, 'nextSlide');
});

export default function createSlider() {
  calculateCardsQuantity();
  generatePetCards();
  showPetCards();
}

window.addEventListener('resize', () => {
  if (window.innerWidth <= 720) {
    resizedCardsQuantity = 1;
  } else if (window.innerWidth < 1000) {
    resizedCardsQuantity = 2;
  } else {
    resizedCardsQuantity = 3;
  }
  if (cardsQuantity !== resizedCardsQuantity) {
    createSlider();
  }
});
