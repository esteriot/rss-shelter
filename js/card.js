const buttonText = 'Learn more';

function createCard(pet) {
  const card = document.createElement('li');
  card.classList.add('cards__item');
  card.id = pet.name;

  const pic = document.createElement('picture');
  pic.classList.add('cards__img');
  const source1 = document.createElement('source');
  source1.srcset = pet.img[1];
  source1.type = 'image/webp';
  pic.appendChild(source1);
  const source2 = document.createElement('img');
  source2.src = pet.img[0];
  source2.width = 270;
  source2.height = 270;
  source2.alt = `${pet.name}'s photo`;
  source2.setAttribute('loading', 'lazy');
  pic.appendChild(source2);
  card.appendChild(pic);

  const name = document.createElement('span');
  name.classList.add('cards__name');
  name.textContent = pet.name;
  card.appendChild(name);

  const button = document.createElement('button');
  button.classList.add('button', 'cards__button');
  button.textContent = buttonText;
  card.appendChild(button);

  return card;
}

export default createCard;
