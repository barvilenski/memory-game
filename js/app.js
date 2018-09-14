const cardSymbols = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'gem', 'gem', 'leaf', 'leaf', 'paper-plane', 'paper-plane'];
const cardsBoard = document.querySelector('.cards-board');

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

function initGame() {
  const shuffledSymbols = shuffle(cardSymbols);
  for (let symbol of shuffledSymbols) {
    const card = document.createElement('li');
    const cardFront = document.createElement('figure');
    const cardBack = document.createElement('figure');
    const frontSymbol = document.createElement('i');
    const backSymbol = document.createElement('i');

    card.setAttribute('class', 'card');
    card.setAttribute('data-symbol', symbol);

    cardFront.setAttribute('class', 'card-front');
    cardBack.setAttribute('class', 'card-back');
    backSymbol.setAttribute('class', 'card-symbol fas fa-question');
    frontSymbol.setAttribute('class', `card-symbol fas fa-${symbol}`);

    cardFront.appendChild(frontSymbol);
    cardBack.appendChild(backSymbol);
    card.appendChild(cardBack);
    card.appendChild(cardFront);

    cardsBoard.appendChild(card);
  }
}

initGame();
