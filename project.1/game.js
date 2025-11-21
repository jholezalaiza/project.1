// --- Game Variables ---
let randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
let guesses = 10; // Number of guesses allowed
let previousGuesses = []; // Array to store previous guesses

// --- DOM Elements ---
const guessInput = document.getElementById('guessInput');
const checkButton = document.getElementById('checkButton');
const feedbackMessage = document.getElementById('feedbackMessage');
const guessesLeftSpan = document.getElementById('guessesLeft');
const previousGuessesSpan = document.getElementById('previousGuesses');
const resetButton = document.getElementById('resetButton');

// --- Event Listeners ---
checkButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// --- Functions ---

function checkGuess() {
    const userGuess = Number(guessInput.value);

    // Input validation
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedbackMessage.textContent = 'Please enter a valid number between 1 and 100.';
        feedbackMessage.style.color = '#dc3545'; // Red for error
        return;
    }

    // Clear previous error message style
    feedbackMessage.style.color = '#333';

    // Add guess to previous guesses list
    previousGuesses.push(userGuess);
    previousGuessesSpan.textContent = previousGuesses.join(', ');

    // Decrement guesses left
    guesses--;
    guessesLeftSpan.textContent = guesses;

    // Check if guess is correct
    if (userGuess === randomNumber) {
        feedbackMessage.textContent = `🎉 Congratulations! You guessed the number (${randomNumber})!`;
        feedbackMessage.style.color = '#28a745'; // Green for win
        endGame(true);
    } else if (guesses === 0) {
        feedbackMessage.textContent = `Game Over! The number was ${randomNumber}.`;
        feedbackMessage.style.color = '#dc3545'; // Red for lose
        endGame(false);
    } else if (userGuess < randomNumber) {
        feedbackMessage.textContent = 'Too low! Try again.';
    } else { // userGuess > randomNumber
        feedbackMessage.textContent = 'Too high! Try again.';
    }

    // Clear input field for next guess
    guessInput.value = '';
    guessInput.focus(); // Keep focus on input for quick re-entry
}

function endGame(won) {
    guessInput.disabled = true; // Disable input
    checkButton.disabled = true; // Disable check button
    resetButton.classList.remove('hidden'); // Show reset button

    if (won) {
        // You could add special effects here for winning
    } else {
        // You could add special effects here for losing
    }
}

function resetGame() {
    // Reset all game variables
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guesses = 10;
    previousGuesses = [];

    // Reset DOM elements
    guessInput.value = '';
    feedbackMessage.textContent = 'Start guessing...';
    feedbackMessage.style.color = '#333';
    guessesLeftSpan.textContent = guesses;
    previousGuessesSpan.textContent = 'None';
    guessInput.disabled = false;
    checkButton.disabled = false;
    resetButton.classList.add('hidden'); // Hide reset button
    guessInput.focus(); // Focus on input field to start
}