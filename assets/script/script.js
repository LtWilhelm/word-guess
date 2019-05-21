let wordList = ['advice', 'power', 'man', 'spiders', 'creature', 'quill', 'wealth', 'laugh', 'room', 'range', 'zebra', 'silver', 'star', 'riddle', 'mine', 'year', 'rifle', 'honey', 'channel', 'clam', 'nerve', 'furniture', 'desire', 'bushes'];
let selectWord;
let displayWord = [];
let guessedLetters = [];
let letter;
let lives;

// html id's
let word = document.getElementById('word');
let wrong = document.getElementById('wrong')
let guesses = document.getElementById('guesses')

// Objects
let wordGuess = {
    startGame: function() {
        lives = 6;
        selectWord = wordList[Math.floor(Math.random() * wordList.length)];
        console.log(selectWord);
        for (let i = 0; i < selectWord.length; i++) {
            displayWord.push('_');
        }
        word.innerHTML = displayWord.join(' ');
        console.log(displayWord);
    },
    compareLetter: function() {
        if (selectWord.includes(letter)) {
            for (let i = 0; i < selectWord.length; i++) {
                if (selectWord[i] === letter) {
                    displayWord.splice(i, 1, letter);
                }
            }
            word.innerHTML = displayWord.join(' ').toUpperCase();
        }
        else {
            lives--;
            wrong.innerHTML = 'Sorry, there is no ' + letter;
            guessedLetters.push(letter);
            guesses.innerHTML = guessedLetters;
            if (lives <= 0) {
                this.gameOver();
            }
        }
        if (!displayWord.includes('_')){
            this.gameWon();
        }
    },
    gameWon: function(){
        document.write('Congratulations, you win!')
    },
    gameOver: function() {
        document.write('Game Over');
    }
}


document.onkeyup = function(event) {
    letter = event.key.toLowerCase();
    console.log(letter);
    wordGuess.compareLetter();
}
wordGuess.startGame();