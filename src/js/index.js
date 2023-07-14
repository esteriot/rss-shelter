/* eslint-disable no-plusplus */
const pets = [
  {
    name: 'Jennifer',
    img: [
      '../img/pets-jennifer.avif',
      '../img/pets-jennifer.webp',
      '../img/pets-jennifer.png',
    ],
    type: 'Dog',
    breed: 'Labrador',
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: '2 months',
    inoculations: ['none'],
    diseases: ['none'],
    parasites: ['none'],
  },
  {
    name: 'Sophia',
    img: [
      '../img/pets-sophia.avif',
      '../img/pets-sophia.webp',
      '../img/pets-sophia.png',
    ],
    type: 'Dog',
    breed: 'Shih tzu',
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: '1 month',
    inoculations: ['parvovirus'],
    diseases: ['none'],
    parasites: ['none'],
  },
  {
    name: 'Woody',
    img: [
      '../img/pets-woody.avif',
      '../img/pets-woody.webp',
      '../img/pets-woody.png',
    ],
    type: 'Dog',
    breed: 'Golden Retriever',
    description:
      'Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.',
    age: '3 years 6 months',
    inoculations: ['adenovirus', 'distemper'],
    diseases: ['right back leg mobility reduced'],
    parasites: ['none'],
  },
  {
    name: 'Scarlett',
    img: [
      '../img/pets-scarlet.avif',
      '../img/pets-scarlet.webp',
      '../img/pets-scarlet.png',
    ],
    type: 'Dog',
    breed: 'Jack Russell Terrier',
    description:
      'Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.',
    age: '3 months',
    inoculations: ['parainfluenza'],
    diseases: ['none'],
    parasites: ['none'],
  },
  {
    name: 'Katrine',
    img: [
      '../img/pets-katrine.avif',
      '../img/pets-katrine.webp',
      '../img/pets-katrine.png',
    ],
    type: 'Cat',
    breed: 'British Shorthair',
    description:
      'Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.',
    age: '6 months',
    inoculations: ['panleukopenia'],
    diseases: ['none'],
    parasites: ['none'],
  },
  {
    name: 'Timmy',
    img: [
      '../img/pets-timmy.avif',
      '../img/pets-timmy.webp',
      '../img/pets-timmy.png',
    ],
    type: 'Cat',
    breed: 'British Shorthair',
    description:
      'Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.',
    age: '2 years 3 months',
    inoculations: ['calicivirus', 'viral rhinotracheitis'],
    diseases: ['kidney stones'],
    parasites: ['none'],
  },
  {
    name: 'Freddie',
    img: [
      '../img/pets-freddie.avif',
      '../img/pets-freddie.webp',
      '../img/pets-freddie.png',
    ],
    type: 'Cat',
    breed: 'British Shorthair',
    description:
      'Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.',
    age: '2 months',
    inoculations: ['rabies'],
    diseases: ['none'],
    parasites: ['none'],
  },
  {
    name: 'Charly',
    img: [
      '../img/pets-charly.avif',
      '../img/pets-charly.webp',
      '../img/pets-charly.png',
    ],
    type: 'Dog',
    breed: 'Jack Russell Terrier',
    description:
      'This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.',
    age: '8 years',
    inoculations: ['bordetella bronchiseptica', 'leptospirosis'],
    diseases: ['deafness', 'blindness'],
    parasites: ['lice', 'fleas'],
  },
];

let resizeTimeout;
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
    const li = document.createElement('li');
    li.classList.add('cards__item');
    li.insertAdjacentHTML(
      'afterbegin',
      `
      <picture class="cards__img">
      <source srcset=${displayedPets[i].img[0]} alt="${displayedPets[i].name}'s photo" type="image/avif">
      <source srcset=${displayedPets[i].img[1]} alt="${displayedPets[i].name}'s photo" type="image/avif">
      <img src=${displayedPets[i].img[2]} loading="lazy" width="270" height="270" alt="${displayedPets[i].name}'s photo">
    </picture>
          <span class="cards__name">${displayedPets[i].name}</span>
          <button class="button cards__button">Learn more</button>`
    );
    cardsList.appendChild(li);
  }
}

function resize() {
  calculateCardsQuantity();
  generatePetCards();
  showPetCards();
}

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resize, 50);
});

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
nextBtn.addEventListener('click', () =>
  handleCarouselClicks(nextBtn, prevBtn, 'nextSlide')
);

calculateCardsQuantity();
generatePetCards();
showPetCards();
