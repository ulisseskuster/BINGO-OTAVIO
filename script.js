var cards = [];
var numbers = [];
var interval;

function generateRandomNumber() {
    return Math.floor(Math.random() * 75) + 1;
}

function generateUniqueRandomNumber() {
    var randomNumber;
    do {
        randomNumber = generateRandomNumber();
    } while (numbers.includes(randomNumber));

    numbers.push(randomNumber);
    return randomNumber;
}

function createCard() {
    var cardContainer = document.createElement('div');
    cardContainer.className = 'card';

    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    var cardNumbers = document.createElement('div');
    cardNumbers.className = 'card-numbers';

    var selectedNumbers = [];

    while (selectedNumbers.length < 24) {
        var randomNumber = generateRandomNumber();
        if (!selectedNumbers.includes(randomNumber)) {
            selectedNumbers.push(randomNumber);
        }
    }

    for (var i = 0; i < selectedNumbers.length; i++) {
        var bingoNumber = document.createElement('div');
        bingoNumber.className = 'bingo-number';
        bingoNumber.textContent = selectedNumbers[i];
        cardNumbers.appendChild(bingoNumber);
    }

    var freeSpace = document.createElement('div');
    freeSpace.className = 'free-space';
    freeSpace.textContent = 'X';
    cardNumbers.insertBefore(freeSpace, cardNumbers.childNodes[12]);

    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardNumbers);

    return cardContainer;
}

function updateBingoNumbers(number) {
    var bingoNumbersContainer = document.getElementById('bingo-numbers');
    var bingoNumber = document.createElement('div');
    bingoNumber.className = 'bingo-number';
    bingoNumber.textContent = number;
    bingoNumbersContainer.appendChild(bingoNumber);
}

function markNumber(number) {
    var cardsContainer = document.getElementById('card-container');
    var cards = cardsContainer.querySelectorAll('.card');

    for (var i = 0; i < cards.length; i++) {
        var cardNumbers = cards[i].querySelectorAll('.bingo-number');

        for (var j = 0; j < cardNumbers.length; j++) {
            if (cardNumbers[j].textContent === number.toString()) {
                cardNumbers[j].classList.add('marked');
                checkBingo(cards[i]);
                break;
            }
        }
    }
}

function checkBingo(card) {
    var cardNumbers = card.querySelectorAll('.bingo-number');
    var isBingo = true;

    for (var i = 0; i < cardNumbers.length; i++) {
        if (!cardNumbers[i].classList.contains('marked')) {
            isBingo = false;
            break;
        }
    }

    if (isBingo) {
        var cardHeader = card.querySelector('.card-header');
        var winnerName = cardHeader.textContent;

        clearInterval(interval);
        disableButtons();

        var winnerElement = document.createElement('h2');
        winnerElement.textContent = 'Parabéns ' + winnerName + '! Você ganhou o Bingo.';

        var messageContainer = document.getElementById('message-container');
        messageContainer.appendChild(winnerElement);
    }
}

function checkAllCardsForBingo() {
    for (var i = 0; i < cards.length; i++) {
        if (checkBingo(cards[i])) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    clearInterval(interval);
    cards = [];
    numbers = [];
    document.getElementById('bingo-numbers').innerHTML = '';
    document.getElementById('message-container').innerHTML = '';
    document.getElementById('card-container').innerHTML = '';

    enableButtons();
}

function enableButtons() {
    var addCardButton = document.getElementById('add-card-button');
    var playButton = document.getElementById('play-button');
    var resetButton = document.getElementById('reset-button');

    addCardButton.disabled = false;
    playButton.disabled = true;
    resetButton.disabled = false;
}

function disableButtons() {
    var addCardButton = document.getElementById('add-card-button');
    var playButton = document.getElementById('play-button');
    var resetButton = document.getElementById('reset-button');

    addCardButton.disabled = true;
    playButton.disabled = true;
    resetButton.disabled = false;
}

document.getElementById('add-card-button').addEventListener('click', function () {
    var cardName = prompt('Digite o nome do jogador:');
    if (!cardName) {
        return;
    }

    var cardContainer = createCard();
    var cardHeader = cardContainer.querySelector('.card-header');
    cardHeader.textContent = cardName;

    document.getElementById('card-container').appendChild(cardContainer);
    cards.push(cardContainer);

    if (cards.length >= 2) {
        var playButton = document.getElementById('play-button');
        playButton.disabled = false;
    }
});

document.getElementById('play-button').addEventListener('click', function () {
    var addCardButton = document.getElementById('add-card-button');
    var playButton = document.getElementById('play-button');
    var resetButton = document.getElementById('reset-button');

    addCardButton.disabled = true;
    playButton.disabled = true;
    resetButton.disabled = false;

    interval = setInterval(function () {
        var randomNumber = generateUniqueRandomNumber();
        updateBingoNumbers(randomNumber);
        markNumber(randomNumber);

        if (numbers.length === 75) {
            clearInterval(interval);
            disableButtons();

            var messageContainer = document.getElementById('message-container');
            var noWinnerElement = document.createElement('h1');
            noWinnerElement.textContent = 'FIM DO JOGO.';
            messageContainer.appendChild(noWinnerElement);
        }
    }, 1000);
});

document.getElementById('reset-button').addEventListener('click', function () {
    resetGame();
});

document.getElementById('play-button').addEventListener('click', function () {
    playGame();
});
