import '../scss/card.scss';

const buttonText = 'More info';

function createCard(pet) {
  const card = document.createElement('li');
  card.classList.add('cards__item');
  card.id = pet.name;

  const pic = document.createElement('img');
  pic.classList.add('slider__img');
  pic.src = pet.img;
  pic.width = 270;
  pic.height = 270;
  pic.alt = `${pet.name}'s photo`;
  pic.setAttribute('loading', 'lazy');
  card.appendChild(pic);

  const name = document.createElement('span');
  name.classList.add('slider__name');
  name.textContent = pet.name;
  card.appendChild(name);

  const button = document.createElement('button');
  button.classList.add('button', 'cards__button');
  button.textContent = buttonText;
  card.appendChild(button);

  return card;
}

export default createCard;
