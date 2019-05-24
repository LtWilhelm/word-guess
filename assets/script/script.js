let wordList = ['advice', 'power', 'man', 'spiders', 'creature', 'quill', 'wealth', 'laugh', 'room', 'range', 'zebra', 'silver', 'star', 'riddle', 'mine', 'year', 'rifle', 'honey', 'channel', 'clam', 'nerve', 'furniture', 'desire', 'bushes'];
let selectWord;
let displayWord = [];
let guessedLetters = [];
let letter;
let guessesRemaining;
let wins = 0;
let losses = 0;
let gameActive = true;

// html id's
let word = document.getElementById('word');
let wrong = document.getElementById('wrong');
let guesses = document.getElementById('guesses');
let remaining = document.getElementById('remaining');
let canvas = document.getElementById('canvas');
let winDisplay = document.getElementById('wins');
let lossDisplay = document.getElementById('losses');
let resetButton = document.getElementById('reset');
let winLose = document.getElementById('winLose');
let endScreen = document.getElementById('gameOver')

// canvas context and shapes
let ctx = canvas.getContext('2d');
// ctx.fillStyle = 
function gallows () {
    ctx.strokeStyle = 'saddlebrown';
    ctx.lineWidth = 10;
    ctx.moveTo(150, 40);
    ctx.lineTo(150, 10);
    ctx.lineTo(30, 10);
    ctx.lineTo(30, 290);
    ctx.moveTo(0, 290);
    ctx.lineTo(300, 290);
    ctx.stroke();
}
function head () {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'beige';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(150, 80, 40, 0, 360);
    ctx.stroke();
    ctx.fill();
}
function body () {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.moveTo(150, 120);
    ctx.lineTo(150, 200);
    ctx.stroke();
}
function leftLeg () {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.moveTo(150, 198);
    ctx.lineTo(100, 250);
    ctx.stroke();
}
function rightLeg () {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.moveTo(150, 198);
    ctx.lineTo(200, 250);
    ctx.stroke();
}
function arms () {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.moveTo(100, 140);
    ctx.lineTo(200, 140);
    ctx.stroke();
}
function printGO () {
    winLose.innerHTML = "He's dead, Jim..."
    winLose.hidden = false;
}
function printWin () {
    winLose.innerHTML = "Stickman Lives!"
    winLose.hidden = false;
}
function clear () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width;
}


// Objects
let wordGuess = {
    startGame: function() {
        gameActive = true;
        clear();
        gallows();
        resetButton.hidden = true;
        endScreen.hidden = true;
        displayWord = [];
        guessedLetters = [];
        guessesRemaining = 5;
        remaining.innerHTML = 'Guesses remaining: ' + guessesRemaining;
        wrong.innerHTML = ' ';
        guesses.innerHTML = ' ';
        winDisplay.innerHTML = 'Wins: ' + wins;
        lossDisplay.innerHTML = 'Losses: ' + losses;
        selectWord = wordList[Math.floor(Math.random() * wordList.length)];
        console.log(selectWord);
        for (let i = 0; i < selectWord.length; i++) {
            displayWord.push('_');
        }
        word.innerHTML = displayWord.join(' ');
        console.log(displayWord);
    },
    compareLetter: function() {
        if (displayWord.includes(letter) || guessedLetters.includes(letter)) {
            wrong.innerHTML = 'You already guessed ' + letter.toUpperCase();
        }
        else if (selectWord.includes(letter)) {
            for (let i = 0; i < selectWord.length; i++) {
                if (selectWord[i] === letter) {
                    displayWord.splice(i, 1, letter);
                }
            }
            word.innerHTML = displayWord.join(' ').toUpperCase();
        }
        else {
            guessesRemaining--;
            remaining.innerHTML = 'Guesses remaining: ' + guessesRemaining;
            wrong.innerHTML = 'Sorry, there is no ' + letter.toUpperCase();
            guessedLetters.push(letter);
            guesses.innerHTML = guessedLetters.join(', ').toUpperCase();
            if (guessesRemaining <= 0) {
                this.gameOver();
            }
        }
        if (!displayWord.includes('_')){
            this.gameWon();
        }
    },
    gameWon: function(){
        printWin();
        wins++;
        resetButton.hidden = false;
        gameActive = false;
    },
    gameOver: function() {
        printGO();
        losses++;
        resetButton.hidden = false;
        gameActive = false;
    }
}

wordGuess.startGame();

document.onkeyup = function(event) {
    if (gameActive) {
        letter = event.key.toLowerCase();
        console.log(letter);
        wordGuess.compareLetter();
        if (guessesRemaining === 4) {
            head();
        }
        else if (guessesRemaining === 3) {
            body();
        }
        else if (guessesRemaining === 2) {
            leftLeg();
        }
        else if (guessesRemaining === 1) {
            rightLeg();
        }
        else if (guessesRemaining === 0) {
            arms();
        }
    }
}
resetButton.onclick = function() {
    wordGuess.startGame();
}