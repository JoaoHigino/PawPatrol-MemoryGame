/* jshint esversion: 11 */
const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');

// card characters
const characters = [
  'chase',
  'skye',
  'everest',
  'marshall',
  'rocky',
  'zuma',
  'ryder',
  'tracker',
  'mayorgoodway',
  'rubles',
];

// create board
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    setTimeout(() => {
      alert(`Congratulations, your time was: ${timer.innerHTML}`);
    }, 1000);
  }
};

// check cards
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';

    }, 1500);
  }

};

// reveal cards
const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
};

// create card
const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('assets/images/${character}.png')`;
  card.appendChild(front);
  card.appendChild(back);
  card.style.pointerEvents = "none";
  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

// load game
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

// start timer
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

};

window.onload = () => {
  loadGame();
};

// reset game

const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", resetGame);

function resetGame() {
  location.reload();
}

// start game

const startButton = document.querySelector(".start");

startButton.addEventListener("click", startGame);

function startGame() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.pointerEvents = "auto";
  });
  resetButton.classList.remove("hidden");
  startButton.classList.add("hidden");
  startTimer();
}

// how to play open instructions
const rulesButton = document.querySelector(".howtoplay");
let rules = document.getElementsByClassName("rules-pop");

rulesButton.addEventListener('click', showRules);

function showRules() {
  rules[0].style.display = "block";
}

// close instructions 
const playButton = document.querySelector(".back-button");
rules = document.getElementsByClassName("rules-pop");

playButton.addEventListener('click', hideRules);

function hideRules() {
  rules[0].style.display = "none";
}