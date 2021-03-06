const cardSymbols = ['bolt', 'bolt', 'bomb', 'bomb', 'football-ball', 'football-ball', 'gem', 'gem', 'heart', 'heart', 'poo', 'poo', 'robot', 'robot', 'rocket', 'rocket'];
const cardsBoard = document.querySelector('.cards-board');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const movesNumber = document.querySelector('.moves-value');
const starsContainer = document.querySelector('.stars');
const starsArray = document.querySelectorAll('.star');
const completionScreen = document.querySelector('.completion-screen');
const completionTitle = document.querySelector('.completion-title');
const completionScore = document.querySelector('.completion-score-value');
const completionStars = document.querySelectorAll('.completion-stars .star');
const resetGameButton = document.querySelector('.reset-game');
const cardFlipSound = new Audio('snd/card-flip.wav');
let selectedCards = [], matchedCardsCounter = 0;
let firstMove = true, movesCounter = 0, starsCounter = 3;
let gameTimer, secondsCounter = 0;

/* This function initializes the game's elements */
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

/* This function gets an array and returns the array shuffled */
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

/* This function handles card flip events */
function flipCard() {
  const flipSoundClone = cardFlipSound.cloneNode();
  flipSoundClone.play();

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

/* This function updates the timer */
function setTime() {
  secondsCounter++;
  timerMinutes.textContent = padTime(parseInt(secondsCounter / 60));
  timerSeconds.textContent = padTime(secondsCounter % 60);
}

/* This function formats time values */
function padTime(time) {
  return time > 9 ? time : '0' + time;
}

/* This function increments the moves counter */
function incrementMovesCounter() {
  movesCounter++;
  movesNumber.textContent = movesCounter;
  updateStarRating();
}

/* This function updates the stars rating */
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

/* This function checks if the selected cards match */
function checkCardsMatch() {
  if (selectedCards[0].getAttribute('data-symbol') === selectedCards[1].getAttribute('data-symbol')) {
    matchSelectedCards();
  } else {
    setTimeout(resetSelectedCards, 1000);
  }
}

/* This function matches the selected cards */
function matchSelectedCards() {
  for (let card of selectedCards) {
    card.classList.add('card-matched');
  }
  selectedCards = [];
  matchedCardsCounter += 2;
}

/* This function resets the selected cards */
function resetSelectedCards() {
  for (let card of selectedCards) {
    card.classList.remove('card-flipped');
  }
  selectedCards = [];
}

/* This function ends the game and displays a greeting message */
function finishGame() {
  clearInterval(gameTimer);

  switch (starsCounter) {
    case 3:
      completionTitle.textContent = 'PERFECT! YOU DID EXTREMELY WELL!';
      break;
    case 2:
      completionTitle.textContent = 'NICELY DONE! ALMOST PERFECT!';
      completionStars[2].classList.add('star-disabled');
      break;
    case 1:
      completionTitle.textContent = 'PRACTICE SOME MORE FOR BETTER RESULTS!';
      completionStars[2].classList.add('star-disabled');
      completionStars[1].classList.add('star-disabled');
      break;
  }

  completionScore.textContent = calculateScore();

  cardsBoard.classList.add('cards-board-blurred');
  completionScreen.classList.add('completion-screen-enabled');
}

/* This function calculates the score of the player and returns it */
function calculateScore() {
  let score = 8000;

  if (movesCounter > 8 && movesCounter < 28) {
    score -= ((movesCounter - 8) * 300);
  } else if (movesCounter >= 28) {
    score = 2000;
  }

  return score;
}

/* This function resets the game */
function resetGame() {
  window.location.reload(false);
}

initGame();
