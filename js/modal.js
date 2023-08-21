import '../scss/modal.scss';

import pets from './pets';

const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close');
const modalContainer = document.querySelector('.modal__container');

export default function createModal(card) {
  modal.classList.add('modal__active');
  const pet = pets.find((p) => p.name === card.id);
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.classList.add('pet-card__img');
  img.src = pet.img;
  div.appendChild(img);
  const description = document.createElement('div');
  description.classList.add('pet-card__description');
  div.appendChild(description);
  const heading = document.createElement('h2');
  heading.classList.add('pet-card__heading');
  heading.textContent = pet.name;
  description.appendChild(heading);
  const animal = document.createElement('span');
  animal.classList.add('pet-card__animal');
  animal.textContent = `${pet.type} - ${pet.breed}`;
  description.appendChild(animal);
  const about = document.createElement('p');
  about.classList.add('pet-card__about');
  about.textContent = pet.description;
  description.appendChild(about);
  const list = document.createElement('ul');
  list.classList.add('pet-card__list');
  description.appendChild(list);
  const age = document.createElement('li');
  age.classList.add('pet-card__item');
  age.textContent = `Age: ${pet.age}`;
  list.appendChild(age);
  const inoculations = document.createElement('li');
  inoculations.classList.add('pet-card__item');
  inoculations.textContent = `Inoculations: ${pet.inoculations.join(', ')}`;
  list.appendChild(inoculations);
  const diseases = document.createElement('li');
  diseases.classList.add('pet-card__item');
  diseases.textContent = `Diseases: ${pet.diseases.join(', ')}`;
  list.appendChild(diseases);
  const parasites = document.createElement('li');
  parasites.classList.add('pet-card__item');
  parasites.textContent = `Parasites: ${pet.parasites.join(', ')}`;
  list.appendChild(parasites);
  div.classList.add('pet-card');
  modalContainer.appendChild(div);
  modalContainer.classList.add('modal__container_active');
  document.body.classList.add('lock');
}

function toggleModalShow() {
  modal.classList.remove('modal__active');
  document.querySelector('.pet-card').remove();
  document.body.classList.remove('lock');
}

modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal__active')) {
    toggleModalShow();
  }
});

modalCloseBtn.addEventListener('click', () => {
  toggleModalShow();
});
