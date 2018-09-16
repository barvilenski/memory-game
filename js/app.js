const cardSymbols = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'gem', 'gem', 'leaf', 'leaf', 'paper-plane', 'paper-plane'];
const cardsBoard = document.querySelector('.cards-board');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const movesNumber = document.querySelector('.moves-value');
const starsContainer = document.querySelector('.stars');
const starsArray = document.querySelectorAll('.star');
const completionScreen = document.querySelector('.completion-screen');
const completionStars = document.querySelector('.completion-stars');
const completionMessage = document.querySelector('.completion-message');
const resetGameButton = document.querySelector('.reset-game');
const cardFlipSound = new Audio('snd/card-flip.wav');
let selectedCards = [], matchedCardsCounter = 0;
let firstMove = true, movesCounter = 0, starsCounter = 3;
let gameTimer, secondsCounter = 0;

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

  resetGameButton.addEventListener('click', resetGame);
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
  cardFlipSound.currentTime = 0;
  cardFlipSound.play();

  if (firstMove) {
    gameTimer = setInterval(setTime, 1000);
    resetGameButton.classList.add('reset-game-enabled');
    firstMove = false;
  }

  if (selectedCards.length <= 1) {
    selectedCards.push(this);
    this.classList.add('card-flipped');
  }

  if (selectedCards.length === 2) {
    cardsBoard.classList.add('cards-board-disabled');
    incrementMovesCounter();
    checkCardsMatch();
    (matchedCardsCounter === cardSymbols.length) ? setTimeout(finishGame, 1200) : setTimeout(function() {
      cardsBoard.classList.remove('cards-board-disabled');
    }, 1000);
  }
}

function setTime() {
  secondsCounter++;
  timerMinutes.textContent = padTime(parseInt(secondsCounter / 60));
  timerSeconds.textContent = padTime(secondsCounter % 60);
}

function padTime(time) {
  return time > 9 ? time : '0' + time;
}

function incrementMovesCounter() {
  movesCounter++;
  movesNumber.textContent = movesCounter;
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

function checkCardsMatch() {
  if (selectedCards[0].getAttribute('data-symbol') === selectedCards[1].getAttribute('data-symbol')) {
    matchSelectedCards();
  } else {
    setTimeout(resetSelectedCards, 1000);
  }
}

function matchSelectedCards() {
  for (let card of selectedCards) {
    card.classList.add('card-matched');
  }
  selectedCards = [];
  matchedCardsCounter += 2;
}

function resetSelectedCards() {
  for (let card of selectedCards) {
    card.classList.remove('card-flipped');
  }
  selectedCards = [];
}

function finishGame() {
  clearInterval(gameTimer);

  completionStars.innerHTML = starsContainer.innerHTML;

  switch (starsCounter) {
    case 3:
      completionMessage.textContent = 'Perfect job, you did extremely well!'
      break;
    case 2:
      completionMessage.textContent = 'Nicely done, almost perfect!'
      break;
    case 1:
      completionMessage.textContent = 'Practice some more for better results!'
      break;
  }

  cardsBoard.classList.add('cards-board-blurred');
  completionScreen.classList.add('completion-screen-enabled');
}

function resetGame() {
  window.location.reload(false);
}

initGame();
