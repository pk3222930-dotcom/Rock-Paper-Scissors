const form = document.querySelector('#guess-form');
const input = document.querySelector('#guess-input');
const feedback = document.querySelector('#feedback');
const attemptsText = document.querySelector('#attempts');
const restartButton = document.querySelector('#restart-button');

let targetNumber;
let attempts;
let gameOver;

function startGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;

  form.reset();
  input.disabled = false;
  form.querySelector('button').disabled = false;
  feedback.textContent = 'Make your first guess!';
  feedback.classList.remove('correct');
  attemptsText.textContent = 'Attempts: 0';
  restartButton.hidden = true;
  input.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (gameOver) return;

  const guess = Number(input.value);

  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    feedback.textContent = 'Please enter a whole number from 1 to 100.';
    return;
  }

  attempts += 1;
  attemptsText.textContent = `Attempts: ${attempts}`;

  if (guess > targetNumber) {
    feedback.textContent = 'Too High!';
  } else if (guess < targetNumber) {
    feedback.textContent = 'Too Low!';
  } else {
    feedback.textContent = `Correct! The number was ${targetNumber}.`;
    feedback.classList.add('correct');
    gameOver = true;
    input.disabled = true;
    form.querySelector('button').disabled = true;
    restartButton.hidden = false;
    restartButton.focus();
  }

  input.select();
});

restartButton.addEventListener('click', startGame);

startGame();
