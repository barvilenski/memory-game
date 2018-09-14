const cardSymbols = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'gem', 'gem', 'leaf', 'leaf', 'paper-plane', 'paper-plane'];
const cardsBoard = document.querySelector('.cards-board');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const movesCounterElem = document.querySelector('.moves-value');
const starsArray = document.querySelectorAll('.star');
let selectedCards = [];
let firstMove = true, movesCounter = 0, starsCounter = 3;
let gameTimer, totalSeconds = 0;

function initGame() {
  const shuffledSymbols = shuffle(cardSymbols);
  for (let symbol of shuffledSymbols) {
    const card = document.createElement('li');
    const cardFront = document.createElement('figure');
    const cardBack = document.createElement('figure');
    const frontSymbol = document.createElement('i');
    const backSymbol = document.createElement('i');

    card.addEventListener('click', flipCard);
    card.setAttribute('class', 'card');
    card.setAttribute('data-symbol', symbol);

    cardFront.setAttribute('class', 'card-front');
    cardBack.setAttribute('class', 'card-back');
    frontSymbol.setAttribute('class', `card-symbol fas fa-${symbol}`);
    backSymbol.setAttribute('class', 'card-symbol fas fa-question');

    cardFront.appendChild(frontSymbol);
    cardBack.appendChild(backSymbol);
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    cardsBoard.appendChild(card);
  }
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex, temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function flipCard() {
  if (firstMove) {
    gameTimer = setInterval(setTime, 1000);
    firstMove = false;
  }

  if (selectedCards.length <= 1) {
    selectedCards.push(this);
    this.classList.add('card-flipped');
  }

  if (selectedCards.length === 2) {
    cardsBoard.classList.add('cards-board-disabled');
    incrementMovesCounter();
    // check cards match
  }
}

function setTime() {
  totalSeconds++;
  timerMinutes.textContent = padTime(parseInt(totalSeconds / 60));
  timerSeconds.textContent = padTime(totalSeconds % 60);
}

function padTime(time) {
  return time > 9 ? time : '0' + time;
}

function incrementMovesCounter() {
  movesCounter++;
  movesCounterElem.textContent = movesCounter;
  updateStarRating();
}

function updateStarRating() {
  switch (movesCounter) {
    case 14:
      starsArray[2].classList.add('star-disabled');
      starsCounter = 2;
      break;
    case 18:
      starsArray[1].classList.add('star-disabled');
      starsCounter = 1;
      break;
  }
}

initGame();
