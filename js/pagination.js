import pets from './pets';
import createCard from './card';
import createModal from './modal';

const cardsList = document.querySelector('.cards__list');
const currentPage = document.querySelector('.cards__nav--current');
const firstPage = document.querySelector('.firstPage');
const prevPage = document.querySelector('.prevPage');
const nextPage = document.querySelector('.nextPage');
const lastPage = document.querySelector('.lastPage');

let cardsQuantity;
let resizedCardsQuantity;
let page = 1;
let petsToShow = [];
let maxPage;
const petsArray = [];

for (let i = 0; i <= 3; i += 1) {
  petsArray.push(...pets);
}

function calculateCardsQuantity() {
  if (window.innerWidth <= 656) {
    cardsQuantity = 3;
  } else if (window.innerWidth < 1300) {
    cardsQuantity = 6;
  } else {
    cardsQuantity = 8;
  }
}

function showPetCards() {
  cardsList.innerHTML = '';
  petsToShow = petsArray.slice(
    (page - 1) * cardsQuantity,
    page * cardsQuantity
  );
  for (let i = 0; i < petsToShow.length; i += 1) {
    const li = createCard(petsToShow[i]);
    cardsList.appendChild(li);
    li.addEventListener('click', () => {
      createModal(li);
    });
  }
}

firstPage.addEventListener('click', () => {
  page = 1;
  currentPage.textContent = page;

  showPetCards();
  firstPage.classList.add('cards__nav--inactive');
  firstPage.setAttribute('disabled', 'disabled');
  prevPage.classList.add('cards__nav--inactive');
  prevPage.setAttribute('disabled', 'disabled');
  nextPage.classList.remove('cards__nav--inactive');
  nextPage.removeAttribute('disabled', 'disabled');
  lastPage.classList.remove('cards__nav--inactive');
  lastPage.removeAttribute('disabled', 'disabled');
});

prevPage.addEventListener('click', () => {
  page -= 1;
  maxPage = Math.ceil(petsArray.length / cardsQuantity);
  currentPage.textContent = page;

  showPetCards();
  if (page === 1) {
    prevPage.classList.add('cards__nav--inactive');
    prevPage.setAttribute('disabled', 'disabled');
    firstPage.classList.add('cards__nav--inactive');
    firstPage.setAttribute('disabled', 'disabled');
  }
  if (page > 1) {
    nextPage.classList.remove('cards__nav--inactive');
    nextPage.removeAttribute('disabled', 'disabled');
  }
  if (page !== maxPage) {
    lastPage.classList.remove('cards__nav--inactive');
    lastPage.removeAttribute('disabled', 'disabled');
  }
});

nextPage.addEventListener('click', () => {
  page += 1;
  maxPage = Math.ceil(petsArray.length / cardsQuantity);
  currentPage.textContent = page;
  showPetCards();

  if (petsToShow.length < cardsQuantity) {
    nextPage.classList.add('cards__nav--inactive');
    nextPage.setAttribute('disabled', 'disabled');
  }
  if (page > 1) {
    prevPage.classList.remove('cards__nav--inactive');
    prevPage.removeAttribute('disabled', 'disabled');
    firstPage.classList.remove('cards__nav--inactive');
    firstPage.removeAttribute('disabled', 'disabled');
  }
  if (page === maxPage) {
    lastPage.classList.add('cards__nav--inactive');
    lastPage.setAttribute('disabled', 'disabled');
    nextPage.classList.add('cards__nav--inactive');
    nextPage.setAttribute('disabled', 'disabled');
  }
});

lastPage.addEventListener('click', () => {
  page = Math.ceil(petsArray.length / cardsQuantity);
  currentPage.textContent = page;
  showPetCards();
  firstPage.classList.remove('cards__nav--inactive');
  firstPage.removeAttribute('disabled', 'disabled');
  nextPage.classList.add('cards__nav--inactive');
  nextPage.setAttribute('disabled', 'disabled');
  prevPage.classList.remove('cards__nav--inactive');
  prevPage.removeAttribute('disabled', 'disabled');
  lastPage.classList.add('cards__nav--inactive');
  lastPage.setAttribute('disabled', 'disabled');
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 656) {
    resizedCardsQuantity = 3;
  } else if (window.innerWidth < 1300) {
    resizedCardsQuantity = 6;
  } else {
    resizedCardsQuantity = 8;
  }
  if (cardsQuantity !== resizedCardsQuantity) {
    calculateCardsQuantity();
    showPetCards();
  }
});

calculateCardsQuantity();
showPetCards();
